import { Button, TouchableOpacity } from "react-native"

import { useTheme } from "@/theme"
import { PlusIcon } from "@/theme/assets/svg"

import { styles } from "./AddTaskButton.style"

type Props = {
  onPress: () => void
}
export default function AddTaskButton({ onPress }: Props) {
  const { colors, backgrounds } = useTheme()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, backgrounds.purple100]}
      onPress={onPress}
    >
      <PlusIcon width={24} height={24} color={colors.purple500} />
    </TouchableOpacity>
  )
}
