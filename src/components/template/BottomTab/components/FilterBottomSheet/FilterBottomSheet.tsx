import { forwardRef } from "react"
import { Button, Text, View } from "react-native"

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"

import { styles } from "../../BottomTab.styles"

type Props = {
  onDeleteAllCompletedTasks: () => void
}

const FilterBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onDeleteAllCompletedTasks }, ref) => {
    return (
      <BottomSheetModal ref={ref} index={0} snapPoints={["50%"]}>
        <BottomSheetView style={styles.bottomSheet}>
          <View style={styles.tabContent}>
            <Text>Filter tasks options BottomSheet</Text>
            <Button title="Delete all completed tasks" onPress={onDeleteAllCompletedTasks} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    )
  },
)

export default FilterBottomSheet
