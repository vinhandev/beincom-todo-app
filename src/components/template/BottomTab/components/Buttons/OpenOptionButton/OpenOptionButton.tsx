import { TouchableOpacity } from "react-native"

import { useTheme } from "@/theme"
import { OptionIcon } from "@/theme/assets/svg"

type Props = {
  onPress: () => void
}
export default function OpenOptionButton({ onPress }: Props) {
  const { colors } = useTheme()
  return (
    <TouchableOpacity onPress={onPress}>
      <OptionIcon width={22} height={22} color={colors.gray700} />
    </TouchableOpacity>
  )
}
