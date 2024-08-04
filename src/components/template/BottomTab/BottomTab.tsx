import { useCallback, useMemo, useRef, useState } from "react"
import { Alert, Button, TextInput, View } from "react-native"

import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { Q } from "@nozbe/watermelondb"

import { useTheme } from "@/theme"

import useUserStore, { sortModeType } from "@/store/useUserStore"

import { database } from "@/models"
import Category from "@/models/category.model"
import { navigationRef } from "@/navigators/Application"
import {
  findList,
  useAddCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/services/queries/category"
import { TaskDB, useAddTask } from "@/services/queries/task"

import { styles } from "./BottomTab.styles"
import AddCategoryBottomSheet from "./components/AddBottomSheet/AddCategoryBottomSheet"
import AddTaskBottomSheet from "./components/AddTaskBottomSheet/AddTaskBottomSheet"
import AllListBottomSheet from "./components/AllListBottomSheet/AllListBottomSheet"
import AddTaskButton from "./components/Buttons/AddTaskButton/AddTaskButton"
import OpenMenuButton from "./components/Buttons/OpenMenuButton/OpenMenuButton"
import OpenOptionButton from "./components/Buttons/OpenOptionButton/OpenOptionButton"
import FilterBottomSheet from "./components/FilterBottomSheet/FilterBottomSheet"
import RenameCategorySheet from "./components/RenameCategorySheet/RenameCategorySheet"

export default function BottomTab({
  children,
  addingListRef,
}: {
  children: React.ReactNode
  addingListRef: React.RefObject<BottomSheetModal>
}) {
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("")
  const { components, backgrounds, borders } = useTheme()
  // ref

  const bottomSheetAddTaskModalRef = useRef<BottomSheetModal>(null)
  const bottomSheetListsModalRef = useRef<BottomSheetModal>(null)
  const bottomSheetFilterModalRef = useRef<BottomSheetModal>(null)
  const bottomSheetRenameCategoryModalRef = useRef<BottomSheetModal>(null)
  const textInputRef = useRef<TextInput>()

  // variables
  const setSortMode = useUserStore((state) => state.setSortMode)

  // callbacks

  // functions
  const { mutate: addCategory } = useAddCategory()
  const { mutate: deleteCategory } = useDeleteCategory()
  const { mutate: addTask } = useAddTask()
  const { mutate: updateCategory } = useUpdateCategory()

  function handleAddTask() {
    bottomSheetAddTaskModalRef.current?.present()

    console.log(textInputRef)
    textInputRef.current?.focus()
  }
  function handleAddList() {
    bottomSheetListsModalRef.current?.close()
    addingListRef.current?.present()
  }

  function handleLists() {
    bottomSheetListsModalRef.current?.present()
  }

  function handleFilter() {
    const currentRoute = navigationRef.current?.getCurrentRoute()
    const { categoryId } = currentRoute?.params as { categoryId: string }
    if (!currentRoute) {
      throw new Error("Don't have current route")
    }
    setCurrentCategoryId(categoryId)
    bottomSheetFilterModalRef.current?.present()
  }

  async function handleDeleteAllCompletedTasks() {
    console.log("Delete all completed tasks")
    Alert.alert("Confirm", "Are you sure you want to delete all completed tasks?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const route: { params: { categoryId: string } } =
            navigationRef.current?.getCurrentRoute() as any
          if (!route || !route.params) {
            throw new Error("Route is required")
          }
          const tasks = await TaskDB.query(
            Q.where("is_completed", true),
            Q.where("category_id", route.params.categoryId),
          ).fetch()
          await database.write(async () => {
            await database.batch(
              ...tasks.map((task) => {
                task.markAsDeleted()
                return null
              }),
            )
          })
          bottomSheetFilterModalRef.current?.close()
        },
      },
    ])
  }

  async function handleDeleteCategory() {
    Alert.alert("Confirm", "Are you sure you want to delete this category?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const route: { params: { category: string; categoryId: string } } =
            navigationRef.current?.getCurrentRoute() as any
          if (!route || !route.params) {
            throw new Error("Route is required")
          }
          await deleteCategory(route.params.categoryId)
          bottomSheetFilterModalRef.current?.close()
        },
      },
    ])
  }

  async function handleAddDatabaseList(text: string) {
    if (!text) {
      throw new Error("Title is required")
    }

    const data = await addCategory(
      { name: text, user_id: "", tasks: 0 },
      {
        onSuccess: (data) => {
          console.log("success", data)
          addingListRef.current?.close()
        },
        onError: (err) => {
          throw new Error(err.message)
        },
      },
    )
    return data
  }

  async function handleAddDatabaseTask(text: string) {
    if (!text) {
      throw new Error("Title is required")
    }

    const route: { params: { category: string; categoryId: string } } =
      navigationRef.current?.getCurrentRoute() as any
    if (!route || !route.params) {
      throw new Error("Route is required")
    }

    const category = await findList(route.params.categoryId)

    const data = await addTask(
      {
        title: text,
        isCompleted: false,
        category: {
          name: category.title,
          tasks: category.tasks,
          id: category.id,
          user_id: category.user_id,
        },
        categoryId: route.params.categoryId,
      },
      {
        onSuccess: (data) => {
          console.log("success", data)
          bottomSheetAddTaskModalRef.current?.close()
        },
        onError: (err) => {
          throw new Error(err.message)
        },
      },
    )
    return data
  }

  async function handleUpdateCategory(text: string) {
    if (!text) {
      throw new Error("Title is required")
    }

    const route: { params: { category: string; categoryId: string } } =
      navigationRef.current?.getCurrentRoute() as any

    if (!route || !route.params) {
      throw new Error("Route is required")
    }

    const category = await findList(route.params.categoryId)
    await updateCategory(
      {
        id: category.id,
        name: text,
        tasks: category.tasks,
        user_id: category.user_id,
      },
      {
        onSuccess: (data) => {
          console.log("success", data)
          bottomSheetRenameCategoryModalRef.current?.close()
        },
        onError: (err) => {
          throw new Error(err.message)
        },
      },
    )
  }

  async function handleNavigateCategory(category: Category) {
    navigationRef.navigate(category.id as any, { categoryId: category.id })
    bottomSheetListsModalRef.current?.close()
  }

  async function handleOpenRenameCategoryBottomSheet() {
    bottomSheetRenameCategoryModalRef.current?.present()
  }

  function handleChangeSortMode(sortMode: sortModeType) {
    setSortMode(sortMode)
    bottomSheetFilterModalRef.current?.close()
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>{children}</View>
      <View style={[styles.tab, components.shadowBottomTab, backgrounds.white, borders.gray500]}>
        <OpenMenuButton onPress={handleLists} />
        <AddTaskButton onPress={handleAddTask} />
        <OpenOptionButton onPress={handleFilter} />
      </View>
      <AddCategoryBottomSheet ref={addingListRef} onAddCategory={handleAddDatabaseList} />
      <AllListBottomSheet
        ref={bottomSheetListsModalRef}
        onOpenAddListBottomSheet={handleAddList}
        onNavigateCategory={handleNavigateCategory}
      />
      <AddTaskBottomSheet
        ref={bottomSheetAddTaskModalRef}
        onAddTask={handleAddDatabaseTask}
        textInputRef={textInputRef as any}
      />
      <RenameCategorySheet
        ref={bottomSheetRenameCategoryModalRef}
        onRenameCategory={handleUpdateCategory}
      />
      <FilterBottomSheet
        ref={bottomSheetFilterModalRef}
        currentCategoryId={currentCategoryId}
        onOpenRenameCategoryBottomSheet={handleOpenRenameCategoryBottomSheet}
        onDeleteAllCompletedTasks={handleDeleteAllCompletedTasks}
        onDeleteCategory={handleDeleteCategory}
        onSetSortMode={handleChangeSortMode}
      />
    </BottomSheetModalProvider>
  )
}
