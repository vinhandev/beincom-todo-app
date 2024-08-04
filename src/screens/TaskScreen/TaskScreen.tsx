import { useEffect, useState } from "react"
import { Button, FlatList, Text, View } from "react-native"

import { Q } from "@nozbe/watermelondb"
import { withObservables } from "@nozbe/watermelondb/react"
import { useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

import { useTheme } from "@/theme"

import Task from "@/models/task.model"
import { TaskDB, TaskType, useUpdateTask } from "@/services/queries/task"

import { styles } from "./TaskScreen.style"

function TaskList({ tasks }: { tasks: Task[] }) {
  let unCompletedTasks = tasks.filter((task) => !task.is_completed)
  let completedTasks = tasks.filter((task) => task.is_completed)
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
        <Text style={{ textDecorationLine: item.is_completed ? "line-through" : "none" }}>
          {item.title}
        </Text>
      </View>
    )
  }
  return (
    <View>
      <FlatList
        data={unCompletedTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id ?? ""}
      />
      <Text>Completed Tasks</Text>
      <FlatList
        data={completedTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id ?? ""}
      />
    </View>
  )
}

const enhance = withObservables([], ({ categoryId }: { categoryId: string }) => ({
  tasks: TaskDB.query(Q.on("categories", "id", categoryId)),
}))

const List = enhance(TaskList)

export default function TaskScreen() {
  const { params } = useRoute<any>()
  const categoryId = params?.categoryId ?? ""
  const initTask: TaskType[] = [
    {
      id: "1",
      title: "Task 1",
      isCompleted: true,
      category: {
        name: "My Task",
        tasks: 0,
        id: "",
        user_id: "",
      },
      categoryId: "",
    },
  ]
  const { fonts } = useTheme()

  const animatedValue = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    }
  })

  useEffect(() => {
    animatedValue.value = withTiming(1, { duration: 1000 })
  }, [])

  return (
    <View>
      <Animated.Text style={[fonts.size_32, fonts.family_700, fonts.black, animatedStyle]}>
        Task
      </Animated.Text>
      <List categoryId={categoryId} />
    </View>
  )
}
