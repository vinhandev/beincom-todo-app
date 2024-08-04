import { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { Button, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native"

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet"

import { useTheme } from "@/theme"

import { styles } from "../../BottomTab.styles"

type Props = {
  textInputRef: React.RefObject<TextInput>
  onAddTask: (title: string) => Promise<void>
}

const AddTaskBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onAddTask, textInputRef }, ref) => {
    const [title, setTitle] = useState("")

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
      ),
      [],
    )
    const { gutters, components, backgrounds, fonts } = useTheme()

    return (
      <BottomSheetModal
        enablePanDownToClose
        detached
        backdropComponent={renderBackdrop}
        ref={ref}
        index={0}
        snapPoints={["50%"]}
      >
        <BottomSheetView style={styles.bottomSheet}>
          <View style={[styles.tabContent, gutters.paddingHorizontal_16, gutters.paddingTop_12]}>
            <Text style={components.header}>Create new task</Text>
            <TextInput
              ref={textInputRef as any}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title"
              style={components.textInput}
            />
            <TouchableOpacity
              disabled={!title}
              style={[components.button, !title ? backgrounds.purple200 : null]}
              onPress={() => {
                try {
                  onAddTask(title)
                  setTitle("")
                } catch (error) {}
              }}
            >
              <Text style={[components.textButton, !title ? fonts.gray500 : null]}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    )
  },
)

export default AddTaskBottomSheet
