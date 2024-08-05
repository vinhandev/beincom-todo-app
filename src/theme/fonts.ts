import { TextStyle } from "react-native"

import type { UnionConfiguration } from "@/types/theme/config"
import type { FontColors, FontFamilies, FontSizes } from "@/types/theme/fonts"

import { config } from "@/theme/_config"

export const generateFontColors = (configuration: UnionConfiguration) => {
  return Object.entries(configuration.fonts.colors ?? {}).reduce((acc, [key, value]) => {
    return Object.assign(acc, {
      [`${key}`]: {
        color: value,
      },
    })
  }, {} as FontColors)
}

export const generateFontSizes = () => {
  return config.fonts.sizes.reduce((acc, size) => {
    return Object.assign(acc, {
      [`size_${size}`]: {
        fontSize: size,
      },
    })
  }, {} as FontSizes)
}

export const generateFontFamilies = (configuration: UnionConfiguration) => {
  return Object.entries(configuration.fonts.families ?? {}).reduce((acc, [key, value]) => {
    return Object.assign(acc, {
      [`family_${key}`]: {
        fontFamily: value,
        fontWeight: key,
      },
    })
  }, {} as FontFamilies)
}

export const staticFontStyles = {
  bold: {
    fontWeight: "bold",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  alignCenter: {
    textAlign: "center",
  },
} as const satisfies Record<string, TextStyle>
