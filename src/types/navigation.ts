import type { StackScreenProps } from "@react-navigation/stack"

export type RootStackParamList = {
  Home: undefined
  Example: undefined
}

export type RootScreenProps<S extends keyof RootStackParamList = keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, S>
