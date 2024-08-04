import { useEffect, useState } from "react"
import { Button, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"

import { Q } from "@nozbe/watermelondb"
import { withObservables } from "@nozbe/watermelondb/react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

import { RootStackParamList } from "@/types/navigation"

import { useTheme } from "@/theme"

import useUserStore from "@/store/useUserStore"

import Task from "@/models/task.model"
import { TaskDB, TaskType, useUpdateTask } from "@/services/queries/task"

import { styles } from "./TaskScreen.style"

function TaskList({
  tasks,
  onNavigateTaskDetail,
}: {
  tasks: Task[]
  onNavigateTaskDetail: (taskId: string) => void
}) {
  const sortMode = useUserStore((state) => state.sortMode)
  const formattedTasks =
    sortMode === "default"
      ? tasks.sort((a, b) => (a.created_at > b.created_at ? 1 : -1))
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

  const renderTaskItem = ({ item }: { item: Task }) => {
    return (
      <View style={styles.containerTask}>
        <Button
          title={item.is_completed ? "Unfinish" : "Finish"}
          onPress={() => updateTaskStatus(item)}
        />
        <TouchableOpacity onPress={() => onNavigateTaskDetail(item.id)}>
          <Text style={{ textDecorationLine: item.is_completed ? "line-through" : "none" }}>
            {item.title}
          </Text>
        </TouchableOpacity>
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
        <Text>Completed Tasks</Text>
        <FlatList
          scrollEnabled={false}
          data={completedTasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id ?? ""}
        />
      </ScrollView>
    </View>
  )
}

const enhance = withObservables([], ({ categoryId }: { categoryId: string }) => ({
  tasks: TaskDB.query(Q.on("categories", "id", categoryId)),
}))

const List = enhance(TaskList)

export default function TaskScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { params } = useRoute<any>()
  const categoryId = params?.categoryId ?? ""

  const { fonts } = useTheme()

  const animatedValue = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    }
  })

  function handleNavigateTaskDetail(taskId: string) {
    navigation.navigate("TaskDetail", { taskId })
  }

  useEffect(() => {
    animatedValue.value = withTiming(1, { duration: 1000 })
  }, [])

  return (
    <View>
      <Animated.Text style={[fonts.size_32, fonts.family_700, fonts.black, animatedStyle]}>
        Task
      </Animated.Text>
      <List categoryId={categoryId} onNavigateTaskDetail={handleNavigateTaskDetail} />
    </View>
  )
}
