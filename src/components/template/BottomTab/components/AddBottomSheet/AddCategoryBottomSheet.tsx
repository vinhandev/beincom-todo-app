import { forwardRef, useCallback, useState } from "react"
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native"

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet"

import { useTheme } from "@/theme"

import { styles } from "./AddCategoryBottomSheet.style"

type Props = {
  onAddCategory: (title: string) => Promise<void>
}
const AddCategoryBottomSheet = forwardRef<BottomSheetModal, Props>(({ onAddCategory }, ref) => {
  const { gutters, components } = useTheme()
  const [title, setTitle] = useState("")
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    [],
  )
  return (
    <BottomSheetModal ref={ref} index={0} snapPoints={["50%"]} backdropComponent={renderBackdrop}>
      <BottomSheetView
        style={[styles.container, gutters.paddingHorizontal_16, gutters.paddingBottom_12]}
      >
        <View style={styles.tab}>
          <Text style={components.header}>Create new category</Text>
          <TextInput
            style={components.textInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter category title"
          />
          <TouchableOpacity
            style={components.button}
            onPress={async () => {
              try {
                await onAddCategory(title)
                setTitle("")
              } catch (error) {}
            }}
          >
            <Text style={components.textButton}>Add Category</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

export default AddCategoryBottomSheet
