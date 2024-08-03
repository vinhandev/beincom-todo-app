import { useRef } from "react"
import { Button, Text, View } from "react-native"

import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { Query } from "@nozbe/watermelondb"
import { withObservables } from "@nozbe/watermelondb/react"
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { TabBar } from "react-native-tab-view"

import { RootStackParamList } from "@/types/navigation"

import { useTheme } from "@/theme"

import { BottomTab } from "@/components/template"

import Category from "@/models/category.model"
import { TaskScreen } from "@/screens"
import { CategoryDB } from "@/services/queries/category"

const Tab = createMaterialTopTabNavigator()

function TopTabNavigator({ categories }: { categories: Category[] }) {
  const addingListRef = useRef<BottomSheetModal>(null)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "TopTab">>()
  const { components } = useTheme()

  function handleNavigateProfile() {
    navigation.navigate("Profile")
  }
  function handleNavigateSetting() {
    navigation.navigate("Setting")
  }

  function handleAddNewList() {
    addingListRef.current?.present()
  }

  function tabBarHeader(props: MaterialTopTabBarProps) {
    return (
      <View
        style={[
          {
            flexDirection: "row",
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <TabBar
            {...props}
            scrollEnabled
            bounces
            navigationState={props.state}
            indicatorStyle={{ backgroundColor: "#782CC7" }}
            style={{ backgroundColor: "white" }}
            renderLabel={(props) => <Text>{props.route.name}</Text>}
          />
        </View>
        <Button title="Plus" onPress={handleAddNewList} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <BottomTab addingListRef={addingListRef}>
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
        <View style={[{ flex: 1 }, components.shadow]}>
          {categories && categories.length > 0 ? (
            <Tab.Navigator tabBar={tabBarHeader}>
              {categories.map((list) => (
                <Tab.Screen key={list.id} name={list.title} component={TaskScreen} />
              ))}
            </Tab.Navigator>
          ) : null}
        </View>
      </BottomTab>
    </View>
  )
}

const enhance = withObservables([], () => ({
  categories: CategoryDB.query(),
}))
export const EnhancedTopTabNavigator = enhance(TopTabNavigator)
