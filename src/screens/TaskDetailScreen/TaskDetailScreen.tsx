import { Text, View } from "react-native"

import { Q } from "@nozbe/watermelondb"
import { withObservables } from "@nozbe/watermelondb/react"
import { useRoute } from "@react-navigation/native"

import Task from "@/models/task.model"
import { TaskDB } from "@/services/queries/task"

function TaskItem({ task }: { task: Task }) {
  return (
    <View>
      <Text>{task.title}</Text>
    </View>
  )
}

const enhance = withObservables([], ({ taskId }: { taskId: string }) => ({
  task: TaskDB.findAndObserve(taskId),
}))

const TaskDetail = enhance(TaskItem)

export default function TaskDetailScreen() {
  const { taskId } = useRoute().params as { taskId: string }

  return (
    <View>
      <TaskDetail taskId={taskId} />
    </View>
  )
}
