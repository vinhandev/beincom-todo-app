import { forwardRef } from "react"
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native"

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"

import useUserStore, { sortModeType } from "@/store/useUserStore"

import { styles } from "../../BottomTab.styles"

type Props = {
  onDeleteAllCompletedTasks: () => void
  onSetSortMode: (type: sortModeType) => void
}

const SortTypeList: {
  title: string
  type: sortModeType
}[] = [
  {
    title: "Ascending",
    type: "asc",
  },
  {
    title: "Descending",
    type: "desc",
  },
  {
    title: "Default",
    type: "default",
  },
]

const FilterBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onDeleteAllCompletedTasks, onSetSortMode }, ref) => {
    const sortMode = useUserStore((state) => state.sortMode)
    return (
      <BottomSheetModal ref={ref} index={0} snapPoints={["50%"]}>
        <BottomSheetView style={styles.bottomSheet}>
          <View style={styles.tabContent}>
            <Text>Filter tasks options BottomSheet</Text>
            <FlatList
              data={SortTypeList}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onSetSortMode(item.type)}>
                  <Text>{sortMode === item.type ? `✅ ${item.title}` : item.title}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Delete all completed tasks" onPress={onDeleteAllCompletedTasks} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    )
  },
)

export default FilterBottomSheet
