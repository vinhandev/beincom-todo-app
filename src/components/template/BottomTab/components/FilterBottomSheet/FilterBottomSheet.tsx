import { forwardRef, useCallback } from "react"
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native"

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet"
import { Q } from "@nozbe/watermelondb"
import { withObservables } from "@nozbe/watermelondb/react"
import BouncyCheckbox from "react-native-bouncy-checkbox"

import { useTheme } from "@/theme"

import useUserStore, { sortModeType } from "@/store/useUserStore"

import Category from "@/models/category.model"
import Task from "@/models/task.model"
import { CategoryDB } from "@/services/queries/category"
import { TaskDB } from "@/services/queries/task"

import { styles } from "../../BottomTab.styles"

type Props = {
  currentCategoryId: string
  onDeleteAllCompletedTasks: () => Promise<void>
  onDeleteCategory: () => Promise<void>
  onSetSortMode: (type: sortModeType) => void
  onOpenRenameCategoryBottomSheet: () => void
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

const enhance = withObservables([], () => ({
  categories: CategoryDB.query(),
}))

const DeleteButton = enhance(
  ({
    categories,
    onDeleteCategory,
    title,
  }: {
    categories: Category[]
    onDeleteCategory: () => Promise<void>
    title: string
  }) => {
    const { components } = useTheme()
    const disabled = categories.length <= 1
    return (
      <TouchableOpacity
        style={[disabled ? components.buttonDisabled : components.button]}
        disabled={disabled}
        onPress={onDeleteCategory}
      >
        <Text style={disabled ? components.textButtonDisabled : components.textButton}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  },
)

const enhanceDeleteAllCompletedTasks = withObservables(
  [],
  ({ currentCategoryId }: { currentCategoryId: string }) => ({
    completedTasks: TaskDB.query(
      Q.on("categories", "id", currentCategoryId),
      Q.where("is_completed", true),
    ),
  }),
)

const DeleteAllCompletedTasks = enhanceDeleteAllCompletedTasks(
  ({
    completedTasks,
    onDeleteAllCompletedTasks,
    title,
  }: {
    completedTasks: Task[]
    onDeleteAllCompletedTasks: () => Promise<void>
    title: string
  }) => {
    const { components } = useTheme()
    const disabled = completedTasks.length === 0
    return (
      <TouchableOpacity
        style={disabled ? components.buttonDisabled : components.button}
        disabled={disabled}
        onPress={onDeleteAllCompletedTasks}
      >
        <Text style={disabled ? components.textButtonDisabled : components.textButton}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  },
)

const FilterBottomSheet = forwardRef<BottomSheetModal, Props>(
  (
    {
      currentCategoryId,
      onOpenRenameCategoryBottomSheet,
      onDeleteAllCompletedTasks,
      onDeleteCategory,
      onSetSortMode,
    },
    ref,
  ) => {
    const sortMode = useUserStore((state) => state.sortMode)
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
      ),
      [],
    )
    const { gutters, components, fonts, colors, borders } = useTheme()

    return (
      <BottomSheetModal backdropComponent={renderBackdrop} ref={ref} index={0} snapPoints={["50%"]}>
        <BottomSheetView
          style={[styles.bottomSheet, gutters.paddingHorizontal_16, gutters.paddingBottom_12]}
        >
          <View style={styles.tabContent}>
            <Text style={components.header}>Filters</Text>
            <FlatList
              data={SortTypeList}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    gutters.paddingVertical_12,
                    index !== 0 ? borders.wTop_1 : null,
                    { flexDirection: "row" },
                    borders.gray600,
                  ]}
                  onPress={() => onSetSortMode(item.type)}
                >
                  <BouncyCheckbox
                    fillColor={colors.blue500}
                    isChecked={item.type === sortMode}
                    onPress={() => onSetSortMode(item.type)}
                    size={20}
                  />

                  <Text style={[fonts.gray700, fonts.family_400, fonts.size_16]}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={components.button} onPress={onOpenRenameCategoryBottomSheet}>
              <Text style={components.textButton}>Rename category</Text>
            </TouchableOpacity>
            <DeleteButton onDeleteCategory={onDeleteCategory} title="Delete category" />
            <DeleteAllCompletedTasks
              currentCategoryId={currentCategoryId}
              title="Delete all completed tasks"
              onDeleteAllCompletedTasks={onDeleteAllCompletedTasks}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    )
  },
)

export default FilterBottomSheet
