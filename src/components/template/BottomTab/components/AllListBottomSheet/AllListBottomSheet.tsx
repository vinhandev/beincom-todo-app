import { forwardRef } from "react"
import { Button, Text, View } from "react-native"

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { withObservables } from "@nozbe/watermelondb/react"

import Category from "@/models/category.model"
import { CategoryDB } from "@/services/queries/category"

import { styles } from "./AllListBottomSheet.style"

function CategoryList({ categories }: { categories: Category[] }) {
  return categories.map((item) => (
    <View key={item.id}>
      <Text>{item.title}</Text>
    </View>
  ))
}

const enhance = withObservables([], () => ({
  categories: CategoryDB.query(),
}))

const List = enhance(CategoryList)

type Props = {
  onOpenAddListBottomSheet: () => void
}
const AllListBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ onOpenAddListBottomSheet }, ref) => {
    return (
      <BottomSheetModal ref={ref} index={0} snapPoints={["50%"]}>
        <BottomSheetView style={styles.container}>
          <List />
          <View style={styles.tab}>
            <Button title="Add List" onPress={onOpenAddListBottomSheet} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    )
  },
)
export default AllListBottomSheet
