import { forwardRef, useState } from "react"
import { Button, Text, TextInput, View } from "react-native"

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"

import { styles } from "./AddCategoryBottomSheet.style"

type Props = {
  onAddCategory: (title: string) => Promise<void>
}
const AddCategoryBottomSheet = forwardRef<BottomSheetModal, Props>(({ onAddCategory }, ref) => {
  const [title, setTitle] = useState("")
  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={["50%"]}>
      <BottomSheetView style={styles.container}>
        <View style={styles.tab}>
          <Text>Add List BottomSheet</Text>
          <TextInput value={title} onChangeText={setTitle} />
          <Button
            title="Add List"
            onPress={async () => {
              try {
                await onAddCategory(title)
                setTitle("")
              } catch (error) {}
            }}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

export default AddCategoryBottomSheet
