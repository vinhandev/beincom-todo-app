import { TouchableOpacity } from "react-native"

import { useTheme } from "@/theme"
import { SettingIcon } from "@/theme/assets/svg"

type Props = {
  onPress: () => void
}
export default function SettingButton({ onPress }: Props) {
  const { colors } = useTheme()
  return (
    <TouchableOpacity onPress={onPress}>
      <SettingIcon width={24} height={24} color={colors.gray700} />
    </TouchableOpacity>
  )
}
