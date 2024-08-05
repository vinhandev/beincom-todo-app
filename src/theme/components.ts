import { ImageStyle, TextStyle, ViewStyle } from "react-native"

import type { ComponentTheme } from "@/types/theme/theme"

interface AllStyle extends Record<string, AllStyle | ImageStyle | TextStyle | ViewStyle> {}

export default ({ colors, backgrounds, fonts, gutters }: ComponentTheme) => {
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
    textInput: {
      borderWidth: 0.5,
      borderColor: colors.gray700,
      borderRadius: 5,
      padding: 10,
    },
    button: {
      backgroundColor: colors.purple700,
      borderRadius: 8,
      ...gutters.paddingHorizontal_16,
      ...gutters.paddingVertical_12,
    },
    buttonDisabled: {
      backgroundColor: colors.purple200,
      borderRadius: 8,
      ...gutters.paddingHorizontal_16,
      ...gutters.paddingVertical_12,
      opacity: 0.4,
    },
    textButton: {
      ...fonts.white,
      ...fonts.family_700,
      ...fonts.size_16,
      ...fonts.alignCenter,
    },
    textButtonDisabled: {
      ...fonts.gray700,
      ...fonts.family_700,
      ...fonts.size_16,
      ...fonts.alignCenter,
    },
    header: {
      ...fonts.black,
      ...fonts.family_700,
      ...fonts.size_16,
    },
  } as const satisfies AllStyle
}
