import { DarkTheme, DefaultTheme } from "@react-navigation/native"

import type { ThemeConfiguration } from "@/types/theme/config"

const colorsLight = {
  white: "#FFFFFF",
  black: "#000000",
  red500: "#FF1C00",
  green500: "#00B348",
  gray700: "#4A4A4A",
  gray500: "#E9EDF3",
  gray50: "#E5F0FF",
  purple500: "#782CC7",
  purple200: "#DDC9F4",
  purple100: "#F6EFFC",
  blue700: "#0074D6",
  blue500: "#0063F7",
} as const

const colorsDark = {
  white: "#021526",
  black: "#DDE6ED",
  red500: "#FF1C00",
  green500: "#00B348",
  gray700: "#4A4A4A",
  gray500: "#E9EDF3",
  gray50: "#E5F0FF",
  purple500: "#782CC7",
  purple200: "#DDC9F4",
  purple100: "#F6EFFC",
  blue700: "#0074D6",
  blue500: "#0063F7",
} as const

const families = {
  "500": "Roboto-Medium.ttf",
  "400": "Roboto-Regular.ttf",
  "300": "Roboto-Light.ttf",
  "200": "Roboto-Thin.ttf",
  "700": "Roboto-Bold.ttf",
  "900": "Roboto-Black.ttf",
} as const

const sizes = [12, 16, 24, 32, 40, 80] as const

export const config = {
  colors: colorsLight,
  fonts: {
    sizes,
    families,
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
    background: colorsLight.white,
    card: colorsLight.white,
  },
  variants: {
    dark: {
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
        families,
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
