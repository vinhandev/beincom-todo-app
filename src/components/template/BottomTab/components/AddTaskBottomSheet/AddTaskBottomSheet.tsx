import { forwardRef, useState } from "react"
import { Button, Text, TextInput, View } from "react-native"

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"

import { styles } from "../../BottomTab.styles"

type Props = {
  onAddTask: (title: string) => Promise<void>
}

const AddTaskBottomSheet = forwardRef<BottomSheetModal, Props>(({ onAddTask }, ref) => {
  const [title, setTitle] = useState("")
  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={["50%"]}>
      <BottomSheetView style={styles.bottomSheet}>
        <View style={styles.tabContent}>
          <Text>Add Task BottomSheet</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={{
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <Button
            title="Add Task"
            onPress={() => {
              try {
                onAddTask(title)
                setTitle("")
              } catch (error) {}
            }}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

export default AddTaskBottomSheet
