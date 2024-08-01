import { Button, Text, View } from "react-native"

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { StackNavigationProp } from "@react-navigation/stack"

import { RootStackParamList } from "@/types/navigation"

import { BottomTab } from "@/components/template"

import { HomeScreen } from "@/screens"

const Tab = createMaterialTopTabNavigator()

export function TopTabNavigator({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, "TopTab">
}) {
  function handleNavigateProfile() {
    navigation.navigate("Profile")
  }
  function handleNavigateSetting() {
    navigation.navigate("Setting")
  }

  return (
    <View style={{ flex: 1 }}>
      <BottomTab>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Button title="Open Profile" onPress={handleNavigateProfile} />
          <Text>Tasks</Text>
          <Button title="Open Setting" onPress={handleNavigateSetting} />
        </View>
        <View style={{ flex: 1 }}>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Home1" component={HomeScreen} />
            <Tab.Screen name="Home2" component={HomeScreen} />
          </Tab.Navigator>
        </View>
      </BottomTab>
    </View>
  )
}
