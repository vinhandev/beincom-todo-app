import { useRef, useState } from "react"
import { Button, Keyboard, Text, TextInput, View } from "react-native"

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { withObservables } from "@nozbe/watermelondb/react"
import { useNavigation, useRoute } from "@react-navigation/native"

import Task from "@/models/task.model"
import { navigationRef } from "@/navigators/Application"
import { TaskDB, useDeleteTask, useUpdateTask } from "@/services/queries/task"

function TaskItem({ task }: { task: Task }) {
  const [taskName, setTaskName] = useState(task.title)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { mutate: updateTask } = useUpdateTask()
  const { mutate: deleteTask } = useDeleteTask()

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }
  function handleClose() {
    bottomSheetRef.current?.close()
  }

  async function handleRename() {
    await updateTask(
      {
        id: task.id,
        title: taskName,
        isCompleted: task.is_completed,
        createdAt: task.created_at,
        categoryId: task.category.id,
        category: task.category,
      },
      {
        onSuccess: () => {
          console.log("success task")
          Keyboard.dismiss()
          bottomSheetRef.current?.close()
        },
        onError: () => {
          console.log("error")
        },
      },
    )
  }

  async function handleDelete() {
    await deleteTask(task.id, {
      onSuccess: () => {
        console.log("success task")
        Keyboard.dismiss()
        if (navigationRef.canGoBack()) {
          navigationRef.goBack()
        }
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <Text>Name</Text>
      <Text>{task.title}</Text>
      <Button title="Rename Task" onPress={handleOpen} />
      <Button title="Delete" onPress={handleDelete} />
      <BottomSheet
        enablePanDownToClose
        index={-1}
        snapPoints={["50%"]}
        onClose={handleClose}
        ref={bottomSheetRef}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <TextInput value={taskName} onChangeText={setTaskName} />
          <Button title="Rename" onPress={handleRename} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

const enhance = withObservables([], ({ taskId }: { taskId: string }) => ({
  task: TaskDB.findAndObserve(taskId),
}))

const TaskDetail = enhance(TaskItem)

export default function TaskDetailScreen() {
  const navigation = useNavigation()
  const { taskId } = useRoute().params as { taskId: string }

  return (
    <View style={{ flex: 1 }}>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <TaskDetail taskId={taskId} />
    </View>
  )
}
