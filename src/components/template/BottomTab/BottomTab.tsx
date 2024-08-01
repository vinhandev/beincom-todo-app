import { PropsWithChildren, useCallback, useMemo, useRef } from "react"
import { Button, Keyboard, Text, TextInput, View } from "react-native"

import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet"

import { styles } from "./BottomTab.styles"

export default function BottomTab({ children }: PropsWithChildren) {
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
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.bottomSheet}>
          <View style={styles.tabContent}>
            <Text>Lists Bottom Tab</Text>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
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
