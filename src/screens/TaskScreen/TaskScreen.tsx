import { useEffect, useState } from "react"
import { Button, FlatList, Text, View } from "react-native"

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

import { useTheme } from "@/theme"

import { TaskType } from "@/services/queries/task"

import { styles } from "./TaskScreen.style"

export default function TaskScreen() {
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

  function handlePressChecked(id: string) {
    const newTaskList = taskList.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isFinished: !task.isCompleted,
        }
      }
      return task
    })
    setTaskList(newTaskList)
  }

  const renderTaskItem = ({ item }: { item: TaskType }) => {
    return (
      <View style={styles.containerTask}>
        <Button
          title={item.isCompleted ? "Unfinish" : "Finish"}
          onPress={() => handlePressChecked(item.id ?? "")}
        />
        <Text style={{ textDecorationLine: item.isCompleted ? "line-through" : "none" }}>
          {item.title}
        </Text>
      </View>
    )
  }

  useEffect(() => {
    animatedValue.value = withTiming(1, { duration: 1000 })
  }, [])

  return (
    <View>
      <Animated.Text style={[fonts.size_32, fonts.family_700, fonts.black, animatedStyle]}>
        Task
      </Animated.Text>
      <FlatList
        data={taskList}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id ?? ""}
      />
    </View>
  )
}
