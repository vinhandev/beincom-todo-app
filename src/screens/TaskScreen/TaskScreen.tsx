import { useState } from "react"
import {
  Button,
  FlatList,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"

import { Q } from "@nozbe/watermelondb"
import { withObservables } from "@nozbe/watermelondb/react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import BouncyCheckbox from "react-native-bouncy-checkbox"

import { useTheme } from "@/theme"
import ArrowIcon from "@/theme/assets/svg/ArrowIcon"
import EmptyIcon from "@/theme/assets/svg/EmptyIcon"

import useUserStore from "@/store/useUserStore"

import Task from "@/models/task.model"
import { TaskDB, useUpdateTask } from "@/services/queries/task"

import { styles } from "./TaskScreen.style"

function TaskList({
  tasks,
  onNavigateTaskDetail,
}: {
  tasks: Task[]
  onNavigateTaskDetail: (taskId: string) => void
}) {
  const { fonts, gutters, colors, borders } = useTheme()
  const [isHide, setHide] = useState(true)
  const sortMode = useUserStore((state) => state.sortMode)
  const formattedTasks =
    sortMode === "default"
      ? tasks
      : sortMode === "asc"
        ? tasks.sort((a, b) => (a.title > b.title ? 1 : -1))
        : tasks.sort((a, b) => (a.title < b.title ? 1 : -1))
  let unCompletedTasks = formattedTasks.filter((task) => !task.is_completed)
  let completedTasks = formattedTasks.filter((task) => task.is_completed)
  const { mutate } = useUpdateTask()

  async function updateTaskStatus(task: Task) {
    await mutate(
      {
        isCompleted: !task.is_completed,
        category: task.category,
        title: task.title,
        categoryId: task.category.id,
        id: task.id,
      },
      {
        onSuccess: () => {},
        onError: (error) => {
          console.error(error, "category", task)
        },
      },
    )
  }

  const renderTaskItem = ({ item, index }: { item: Task; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onNavigateTaskDetail(item.id)}
        style={[styles.containerTask, borders.gray600, index !== 0 ? borders.wTop_1 : undefined]}
      >
        <TouchableOpacity
          style={{
            width: 44,
            height: "100%",

            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => updateTaskStatus(item)}
        >
          <BouncyCheckbox
            size={20}
            fillColor={colors.blue500}
            isChecked={item.is_completed}
            onPress={() => updateTaskStatus(item)}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={[
              {
                textDecorationLine: item.is_completed ? "line-through" : "none",
              },
              fonts.size_16,
              fonts.family_400,
              fonts.black,
            ]}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  if (tasks.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <EmptyIcon width={200} height={200} color={colors.purple700} />
        <Text style={[fonts.size_24, fonts.family_700, fonts.black, fonts.alignCenter]}>
          No Tasks yet
        </Text>
        <Text style={[fonts.size_12, fonts.family_400, fonts.gray700, fonts.alignCenter]}>
          You'll see tasks here when you create one.
        </Text>
      </View>
    )
  }

  return (
    <View>
      <ScrollView>
        <FlatList
          scrollEnabled={false}
          data={unCompletedTasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id ?? ""}
        />
        {completedTasks.length > 0 ? (
          <View>
            <TouchableOpacity
              onPress={() => setHide(!isHide)}
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View style={{ marginTop: 5, transform: [{ rotate: isHide ? "-90deg" : "0deg" }] }}>
                <ArrowIcon width={14} height={14} />
              </View>
              <Text
                style={[fonts.family_700, fonts.black, fonts.size_16, gutters.paddingVertical_16]}
              >{`Completed Tasks (${completedTasks.length})`}</Text>
            </TouchableOpacity>
            <View style={{ display: isHide ? "none" : "flex" }}>
              <FlatList
                scrollEnabled={false}
                data={completedTasks}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item.id ?? ""}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  )
}

const enhance = withObservables([], ({ categoryId }: { categoryId: string }) => ({
  tasks: TaskDB.query(Q.on("categories", "id", categoryId), Q.sortBy("created_at", Q.asc)),
}))

const List = enhance(TaskList)

export default function TaskScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { params } = useRoute<any>()
  const categoryId = params?.categoryId ?? ""

  const { gutters, fonts } = useTheme()

  function handleNavigateTaskDetail(taskId: string) {
    navigation.navigate("TaskDetail", { taskId })
  }

  return (
    <View style={[gutters.paddingHorizontal_16, gutters.paddingVertical_12, { flex: 1 }]}>
      <Text style={[fonts.size_32, fonts.family_700, fonts.black]}>Tasks</Text>
      <Text style={[fonts.size_16, fonts.family_400, fonts.gray700]}>
        Your tasks will appear here.
      </Text>

      <View style={[gutters.paddingTop_16, { flex: 1 }]}>
        <List categoryId={categoryId} onNavigateTaskDetail={handleNavigateTaskDetail} />
      </View>
    </View>
  )
}
