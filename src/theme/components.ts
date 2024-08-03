import { ImageStyle, TextStyle, ViewStyle } from "react-native"

import type { ComponentTheme } from "@/types/theme/theme"

interface AllStyle extends Record<string, AllStyle | ImageStyle | TextStyle | ViewStyle> {}

export default ({ colors, backgrounds, fonts }: ComponentTheme) => {
  return {
    shadow: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    shadowBottomTab: {
      shadowColor: "#000",
      shadowOffset: {
        width: -3,
        height: -1,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.3,

      elevation: 13,
    },
  } as const satisfies AllStyle
}
