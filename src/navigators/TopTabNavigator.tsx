import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import { HomeScreen } from "@/screens"

const Tab = createMaterialTopTabNavigator()

export function TopTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Home1" component={HomeScreen} />
      <Tab.Screen name="Home2" component={HomeScreen} />
    </Tab.Navigator>
  )
}
