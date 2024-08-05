import { LegacyRef, Ref, useRef } from "react"

import {
  createNavigationContainerRef,
  NavigationContainer,
  NavigationContainerProps,
  NavigationContainerRef,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

import type { RootStackParamList } from "@/types/navigation"

import { useTheme } from "@/theme"

import { LoginScreen, ProfileScreen, SettingScreen, TaskDetailScreen } from "@/screens"

import { EnhancedTopTabNavigator } from "./TopTabNavigator"

const Stack = createNativeStackNavigator<RootStackParamList>()

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme()

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator
            key={variant}
            screenOptions={{ headerShown: false, animation: "slide_from_right" }}
          >
            <Stack.Screen name="TopTab" component={EnhancedTopTabNavigator} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default ApplicationNavigator
