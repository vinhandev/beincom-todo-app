import { useCallback, useMemo, useRef, useState } from "react"
import { Alert, Button, View } from "react-native"

import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { Q } from "@nozbe/watermelondb"

import { useTheme } from "@/theme"

import useUserStore from "@/store/useUserStore"

import { database } from "@/models"
import Category from "@/models/category.model"
import { navigationRef } from "@/navigators/Application"
import { findList, useAddCategory, useDeleteCategory } from "@/services/queries/category"
import { TaskDB, useAddTask } from "@/services/queries/task"

import { styles } from "./BottomTab.styles"
import AddCategoryBottomSheet from "./components/AddBottomSheet/AddCategoryBottomSheet"
import AddTaskBottomSheet from "./components/AddTaskBottomSheet/AddTaskBottomSheet"
import AllListBottomSheet from "./components/AllListBottomSheet/AllListBottomSheet"
import FilterBottomSheet from "./components/FilterBottomSheet/FilterBottomSheet"

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

  // variables
  const setSortMode = useUserStore((state) => state.setSortMode)

  // callbacks

  // functions
  const { mutate } = useAddCategory()
  const { mutate: deleteCategory } = useDeleteCategory()
  const { mutate: addTask } = useAddTask()

  function handleAddTask() {
    bottomSheetAddTaskModalRef.current?.present()
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

    const data = await mutate(
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

  async function handleNavigateCategory(category: Category) {
    navigationRef.navigate(category.title, { categoryId: category.id })
    bottomSheetListsModalRef.current?.close()
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>{children}</View>
      <View style={[styles.tab, components.shadowBottomTab, backgrounds.white, borders.gray500]}>
        <Button title="Open List" onPress={handleLists} />
        <Button title="Add Task" onPress={handleAddTask} />
        <Button title="Open Filters" onPress={handleFilter} />
      </View>
      <AddCategoryBottomSheet ref={addingListRef} onAddCategory={handleAddDatabaseList} />
      <AllListBottomSheet
        ref={bottomSheetListsModalRef}
        onOpenAddListBottomSheet={handleAddList}
        onNavigateCategory={handleNavigateCategory}
      />
      <AddTaskBottomSheet ref={bottomSheetAddTaskModalRef} onAddTask={handleAddDatabaseTask} />
      <FilterBottomSheet
        currentCategoryId={currentCategoryId}
        ref={bottomSheetFilterModalRef}
        onDeleteAllCompletedTasks={handleDeleteAllCompletedTasks}
        onDeleteCategory={handleDeleteCategory}
        onSetSortMode={(sortMode) => {
          setSortMode(sortMode)
          bottomSheetFilterModalRef.current?.close()
        }}
      />
    </BottomSheetModalProvider>
  )
}
