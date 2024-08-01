import { PropsWithChildren, useCallback, useMemo, useRef } from "react"
import { Button, Text, View } from "react-native"

import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet"

import { styles } from "./BottomTab.styles"

export default function BottomTab({ children }: PropsWithChildren) {
  // ref
  const bottomSheetAddTaskModalRef = useRef<BottomSheetModal>(null)
  const bottomSheetListsModalRef = useRef<BottomSheetModal>(null)
  const bottomSheetFilterModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => ["50%"], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  function handleAddTask() {
    bottomSheetAddTaskModalRef.current?.present()
  }

  function handleLists() {
    bottomSheetListsModalRef.current?.present()
  }

  function handleFilter() {
    bottomSheetFilterModalRef.current?.present()
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>{children}</View>
      <View style={styles.tab}>
        <Button title="Open List" onPress={handleLists} />
        <Button title="Add Task" onPress={handleAddTask} />
        <Button title="Open Filters" onPress={handleFilter} />
      </View>
      <BottomSheetModal
        ref={bottomSheetListsModalRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.container}>
          <Text>Lists Bottom Tab</Text>
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetAddTaskModalRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.container}>
          <Text>Add Task BottomSheet</Text>
        </BottomSheetView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetFilterModalRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.container}>
          <Text>Filter tasks options BottomSheet</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}
