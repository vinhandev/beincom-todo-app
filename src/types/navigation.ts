import type { StackScreenProps } from "@react-navigation/stack"

export type RootStackParamList = {
  TopTab: undefined
  Login: undefined
  Profile: undefined
  Setting: undefined
}

export type RootScreenProps<S extends keyof RootStackParamList = keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, S>
