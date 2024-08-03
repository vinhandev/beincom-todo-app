import { NativeStackScreenProps } from "@react-navigation/native-stack"

export type RootStackParamList = {
  TopTab: undefined
  Login: undefined
  Profile: undefined
  Setting: undefined
}

export type RootScreenProps<S extends keyof RootStackParamList = keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, S>
