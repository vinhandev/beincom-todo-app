import { forwardRef } from "react"
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native"

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import { Q } from "@nozbe/watermelondb"
import { withObservables } from "@nozbe/watermelondb/react"

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
    return <Button disabled={categories.length <= 1} title={title} onPress={onDeleteCategory} />
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
    console.log("completedTasks", completedTasks.length)
    return (
      <Button
        disabled={completedTasks.length === 0}
        title={title}
        onPress={onDeleteAllCompletedTasks}
      />
    )
  },
)

const FilterBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ currentCategoryId, onDeleteAllCompletedTasks, onDeleteCategory, onSetSortMode }, ref) => {
    const sortMode = useUserStore((state) => state.sortMode)
    console.log("currentCategoryId", currentCategoryId)

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
            <Button title="Rename category" onPress={onDeleteAllCompletedTasks} />
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
