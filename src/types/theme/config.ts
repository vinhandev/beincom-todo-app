import type { Theme as NavigationTheme } from "@react-navigation/native"

import { config } from "@/theme/_config"
import generateConfig from "@/theme/ThemeProvider/generateConfig"

import type { AllPartial } from "./common"

export type Variant = keyof typeof config.variants | "default"

export type ThemeState = {
  variant: Variant
}

export type FulfilledThemeConfiguration = {
  readonly colors: Record<string, string>
  fonts: {
    sizes: readonly number[]
    readonly families: Record<string, string>
    readonly colors: Record<string, string>
  }
  gutters: readonly number[]
  readonly backgrounds: Record<string, string>
  borders: {
    widths: readonly number[]
    radius: readonly number[]
    readonly colors: Record<string, string>
  }
  readonly navigationColors: NavigationTheme["colors"]
}

export type VariantThemeConfiguration = {
  readonly colors: FulfilledThemeConfiguration["colors"]
  fonts: {
    readonly families: FulfilledThemeConfiguration["fonts"]["families"]
    readonly colors: FulfilledThemeConfiguration["fonts"]["colors"]
  }
  readonly backgrounds: FulfilledThemeConfiguration["backgrounds"]
  borders: {
    readonly colors: FulfilledThemeConfiguration["borders"]["colors"]
  }
  readonly navigationColors: Partial<NavigationTheme["colors"]>
}

export type ThemeConfiguration = FulfilledThemeConfiguration & {
  variants: {
    [key: PropertyKey]: AllPartial<VariantThemeConfiguration>
  }
}

export type UnionConfiguration = ReturnType<typeof generateConfig>
