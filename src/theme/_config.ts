import { DarkTheme, DefaultTheme } from "@react-navigation/native"

import type { ThemeConfiguration } from "@/types/theme/config"

const colorsLight = {
  white: "#FFFFFF",
  black: "#000000",
  red500: "#FF1C00",
  green500: "#00B348",
  gray500: "#E9EDF3",
  gray50: "#E5F0FF",
  purple500: "#782CC7",
  purple200: "#DDC9F4",
  blue700: "#0074D6",
  blue500: "#0063F7",
} as const

const colorsDark = {
  white: "#FFFFFF",
  black: "#000000",
  red500: "#FF1C00",
  green500: "#00B348",
  gray500: "#E9EDF3",
  gray50: "#E5F0FF",
  purple500: "#782CC7",
  purple200: "#DDC9F4",
  blue700: "#0074D6",
  blue500: "#0063F7",
} as const

const sizes = [12, 16, 24, 32, 40, 80] as const

export const config = {
  colors: colorsLight,
  fonts: {
    sizes,
    colors: colorsLight,
  },
  gutters: sizes,
  backgrounds: colorsLight,
  borders: {
    widths: [1, 2],
    radius: [4, 16],
    colors: colorsLight,
  },
  navigationColors: {
    ...DefaultTheme.colors,
    background: colorsLight.gray50,
    card: colorsLight.gray50,
  },
  variants: {
    dark: {
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
      },
      backgrounds: colorsDark,
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.white,
        card: colorsDark.white,
      },
    },
  },
} as const satisfies ThemeConfiguration
