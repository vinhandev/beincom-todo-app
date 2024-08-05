import { forwardRef, useCallback } from "react"
import { Button, Text, TouchableOpacity, View } from "react-native"

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet"
import { withObservables } from "@nozbe/watermelondb/react"

import { useTheme } from "@/theme"
import components from "@/theme/components"

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
  const { gutters, borders, fonts } = useTheme()
  return (
    <View style={{ flex: 1 }}>
      {categories.map((item, index) => (
        <TouchableOpacity
          style={[
            gutters.paddingHorizontal_16,
            gutters.paddingVertical_12,
            index !== 0 ? borders.wTop_1 : null,
            borders.gray600,
          ]}
          onPress={() => handleNavigateCategory(item)}
          key={item.id}
        >
          <Text style={[fonts.family_400, fonts.gray700, fonts.size_16]}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
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
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
      ),
      [],
    )
    const { gutters, components } = useTheme()
    return (
      <BottomSheetModal backdropComponent={renderBackdrop} ref={ref} index={0} snapPoints={["50%"]}>
        <BottomSheetView
          style={[styles.container, gutters.paddingHorizontal_16, gutters.paddingBottom_12]}
        >
          <View style={[{ flex: 1 }]}>
            <Text style={components.header}>All Category</Text>
            <List onNavigateCategory={onNavigateCategory} />
          </View>
          <TouchableOpacity style={components.button} onPress={onOpenAddListBottomSheet}>
            <Text style={components.textButton}>Add List</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    )
  },
)
export default AllListBottomSheet
