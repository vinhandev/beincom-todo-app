import { forwardRef, useState } from "react"
import { Button, Text, TextInput, View } from "react-native"

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"

import { styles } from "./RenameCategorySheet.style"

type Props = {
  onRenameCategory: (title: string) => Promise<void>
}

const RenameCategorySheet = forwardRef<BottomSheetModal, Props>(({ onRenameCategory }, ref) => {
  const [title, setTitle] = useState("")
  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={["50%"]}>
      <BottomSheetView style={styles.container}>
        <View style={styles.tab}>
          <Text>Rename List BottomSheet</Text>
          <TextInput value={title} onChangeText={setTitle} />
          <Button
            title="Rename List"
            onPress={async () => {
              try {
                await onRenameCategory(title)
                setTitle("")
              } catch (error) {}
            }}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

export default RenameCategorySheet
