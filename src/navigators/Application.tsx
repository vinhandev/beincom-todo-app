import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context"

import type { RootStackParamList } from "@/types/navigation"

import { useTheme } from "@/theme"

import { Example, HomeScreen, LoginScreen, ProfileScreen } from "@/screens"

import { TopTabNavigator } from "./TopTabNavigator"

const Stack = createStackNavigator<RootStackParamList>()

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme()

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TopTab" component={TopTabNavigator} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default ApplicationNavigator
