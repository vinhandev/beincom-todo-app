import { forwardRef } from "react"
import { Button, Text, TouchableOpacity, View } from "react-native"

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { withObservables } from "@nozbe/watermelondb/react"

import Category from "@/models/category.model"
import { navigationRef } from "@/navigators/Application"
import { CategoryDB } from "@/services/queries/category"

import { styles } from "./AllListBottomSheet.style"

function CategoryList({
  categories,
  onNavigateCategory,
}: {
  categories: Category[]
  onNavigateCategory: (category: Category) => void
}) {
  function handleNavigateCategory(category: Category) {
    onNavigateCategory(category)
  }
  return categories.map((item) => (
    <TouchableOpacity onPress={() => handleNavigateCategory(item)} key={item.id}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  ))
}

const enhance = withObservables([], () => ({
  categories: CategoryDB.query(),
}))

const List = enhance(CategoryList)

type Props = {
  onOpenAddListBottomSheet: () => void
  onNavigateCategory: (category: Category) => void
}
const AllListBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onOpenAddListBottomSheet, onNavigateCategory }, ref) => {
    return (
      <BottomSheetModal ref={ref} index={0} snapPoints={["50%"]}>
        <BottomSheetView style={styles.container}>
          <List onNavigateCategory={onNavigateCategory} />
          <View style={styles.tab}>
            <Button title="Add List" onPress={onOpenAddListBottomSheet} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    )
  },
)
export default AllListBottomSheet
