import { PropsWithChildren, useCallback, useMemo, useRef } from "react"
import { Button, Keyboard, Text, TextInput, View } from "react-native"

import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet"
import { withObservables } from "@nozbe/watermelondb/react"
import { InfiniteData, QueryObserverResult, RefetchOptions } from "@tanstack/react-query"

import { useTheme } from "@/theme"

import { database } from "@/models"
import { CategoryPage, useAddCategory } from "@/services/queries/category"

import { styles } from "./BottomTab.styles"
import AddCategoryBottomSheet from "./components/AddBottomSheet/AddCategoryBottomSheet"
import AllListBottomSheet from "./components/AllListBottomSheet/AllListBottomSheet"

export default function BottomTab({
  children,
  addingListRef,
}: {
  children: React.ReactNode
  addingListRef: React.RefObject<BottomSheetModal>
}) {
  const { components, backgrounds, borders } = useTheme()
  // ref

  const bottomSheetAddTaskModalRef = useRef<BottomSheetModal>(null)
  const bottomSheetListsModalRef = useRef<BottomSheetModal>(null)
  const bottomSheetFilterModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => ["50%"], [])
  const snapPointsInput = useMemo(() => ["50%"], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  // functions
  const { mutate } = useAddCategory()

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
    bottomSheetFilterModalRef.current?.present()
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

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>{children}</View>
      <View style={[styles.tab, components.shadowBottomTab, backgrounds.white, borders.gray500]}>
        <Button title="Open List" onPress={handleLists} />
        <Button title="Add Task" onPress={handleAddTask} />
        <Button title="Open Filters" onPress={handleFilter} />
      </View>
      <AddCategoryBottomSheet ref={addingListRef} onAddCategory={handleAddDatabaseList} />
      <AllListBottomSheet ref={bottomSheetListsModalRef} onOpenAddListBottomSheet={handleAddList} />
      <BottomSheetModal
        ref={bottomSheetAddTaskModalRef}
        index={0}
        snapPoints={snapPointsInput}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.bottomSheet}>
          <View style={styles.tabContent}>
            <Text>Add Task BottomSheet</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
              }}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal
        ref={bottomSheetFilterModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.bottomSheet}>
          <View style={styles.tabContent}>
            <Text>Filter tasks options BottomSheet</Text>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}
