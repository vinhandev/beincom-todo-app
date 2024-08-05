import { TouchableOpacity } from "react-native"

import { useTheme } from "@/theme"
import { MenuIcon } from "@/theme/assets/svg"

type Props = {
  onPress: () => void
}
export default function OpenMenuButton({ onPress }: Props) {
  const { colors } = useTheme()
  return (
    <TouchableOpacity onPress={onPress}>
      <MenuIcon width={22} height={22} color={colors.gray700} />
    </TouchableOpacity>
  )
}
