import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context"

import type { RootStackParamList } from "@/types/navigation"

import { useTheme } from "@/theme"

import { Example, Startup } from "@/screens"

const Stack = createStackNavigator<RootStackParamList>()

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme()

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={Startup} />
          <Stack.Screen name="Example" component={Example} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default ApplicationNavigator
