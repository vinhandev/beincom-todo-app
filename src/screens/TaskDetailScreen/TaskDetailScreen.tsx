import { useRef, useState } from "react"
import { Alert, Button, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native"

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { withObservables } from "@nozbe/watermelondb/react"
import { useNavigation, useRoute } from "@react-navigation/native"

import { useTheme } from "@/theme"
import { EditIcon } from "@/theme/assets/svg"
import ArrowIcon from "@/theme/assets/svg/ArrowIcon"

import Task from "@/models/task.model"
import { navigationRef } from "@/navigators/Application"
import { TaskDB, useDeleteTask, useUpdateTask } from "@/services/queries/task"

function TaskItem({ task }: { task: Task }) {
  const [taskName, setTaskName] = useState(task.title)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { mutate: updateTask } = useUpdateTask()
  const { mutate: deleteTask } = useDeleteTask()
  const { fonts, gutters, backgrounds } = useTheme()

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
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
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
          },
          style: "destructive",
        },
      ],
      { cancelable: false },
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <View>
        <View style={[gutters.paddingHorizontal_16, gutters.paddingVertical_12, backgrounds.white]}>
          <Text style={[fonts.gray700, fonts.family_700, fonts.size_16]}>Basic Info</Text>
          <View style={gutters.paddingTop_16}>
            <Text style={[fonts.gray700, fonts.family_400, fonts.size_12]}>Name</Text>
            <Text style={[fonts.gray700, fonts.family_700, fonts.size_16]}>{task.title}</Text>
          </View>
          <TouchableOpacity
            onPress={handleOpen}
            style={[
              {
                position: "absolute",
                right: 16,
                top: 12,
                borderRadius: 4,
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
              },
              backgrounds.gray50,
            ]}
          >
            <EditIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleDelete}
          style={[
            gutters.marginTop_12,
            backgrounds.white,
            gutters.paddingHorizontal_16,
            gutters.paddingVertical_12,
          ]}
        >
          <Text style={[fonts.red500, fonts.family_700, fonts.size_16]}>Delete Task</Text>
        </TouchableOpacity>
      </View>
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
  const { backgrounds, components, gutters, fonts } = useTheme()

  return (
    <View style={[{ flex: 1 }, backgrounds.gray500]}>
      <View
        style={[
          {
            width: "100%",
            height: 50,
            flexDirection: "row",
            alignItems: "center",
          },
          backgrounds.white,
          components.shadow,
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{
            transform: [{ rotate: "90deg" }],
            width: 44,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowIcon width={18} height={18} />
        </TouchableOpacity>
        <Text style={[fonts.family_700, fonts.black, fonts.size_16]}>Task Detail</Text>
      </View>
      <View style={[gutters.marginTop_12, { flex: 1 }]}>
        <TaskDetail taskId={taskId} />
      </View>
    </View>
  )
}
