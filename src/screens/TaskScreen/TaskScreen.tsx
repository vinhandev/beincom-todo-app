import { useEffect, useState } from "react"
import { Button, FlatList, Text, View } from "react-native"

import { Q } from "@nozbe/watermelondb"
import { withObservables } from "@nozbe/watermelondb/react"
import { useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

import { useTheme } from "@/theme"

import Task from "@/models/task.model"
import { TaskDB, TaskType } from "@/services/queries/task"

import { styles } from "./TaskScreen.style"

function TaskList({ tasks }: { tasks: Task[] }) {
  function handlePressChecked(id: string) {
    const newTaskList = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isFinished: !task.is_completed,
        }
      }
      return task
    })
  }

  const renderTaskItem = ({ item }: { item: Task }) => {
    return (
      <View style={styles.containerTask}>
        <Button
          title={item.is_completed ? "Unfinish" : "Finish"}
          onPress={() => handlePressChecked(item.id ?? "")}
        />
        <Text style={{ textDecorationLine: item.is_completed ? "line-through" : "none" }}>
          {item.title}
        </Text>
      </View>
    )
  }
  return (
    <FlatList data={tasks} renderItem={renderTaskItem} keyExtractor={(item) => item.id ?? ""} />
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
  const [taskList, setTaskList] = useState<TaskType[]>(initTask)
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
