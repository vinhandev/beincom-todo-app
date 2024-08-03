import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaProvider } from "react-native-safe-area-context"

import type { RootStackParamList } from "@/types/navigation"

import { useTheme } from "@/theme"

import { LoginScreen, ProfileScreen, SettingScreen } from "@/screens"

import { EnhancedTopTabNavigator } from "./TopTabNavigator"

const Stack = createNativeStackNavigator<RootStackParamList>()

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme()

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TopTab" component={EnhancedTopTabNavigator} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default ApplicationNavigator
