import { useEffect, useRef } from "react"
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
import { CategoryDB, useAddCategory } from "@/services/queries/category"

const Tab = createMaterialTopTabNavigator()

function TopTabNavigator({ categories }: { categories: Category[] }) {
  const addingListRef = useRef<BottomSheetModal>(null)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "TopTab">>()
  const { components } = useTheme()
  const { mutate } = useAddCategory()

  function handleNavigateProfile() {
    navigation.navigate("Profile")
  }
  function handleNavigateSetting() {
    navigation.navigate("Setting")
  }

  function handleAddNewList() {
    addingListRef.current?.present()
  }

  function TabBarHeader(tabBarProps: MaterialTopTabBarProps & { categories: Category[] }) {
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
            {...tabBarProps}
            scrollEnabled
            bounces
            navigationState={tabBarProps.state}
            indicatorStyle={{ backgroundColor: "#782CC7" }}
            style={{ backgroundColor: "white" }}
            renderLabel={(props) => {
              const name =
                tabBarProps.categories.find((item) => item.id === props.route.name)?.title ?? ""

              return <Text>{name}</Text>
            }}
          />
        </View>
        <Button title="Plus" onPress={handleAddNewList} />
      </View>
    )
  }

  useEffect(() => {
    async function handleInitCategory() {
      if (categories.length === 0) {
        await mutate({
          name: "My Tasks",
          user_id: "",
          tasks: 0,
        })
      }
    }
    handleInitCategory()
  }, [categories])

  console.log("categories", categories)

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
            <Tab.Navigator
              key={categories.toString()}
              tabBar={(props) => <TabBarHeader categories={categories} {...props} />}
            >
              {categories.map((category) => (
                <Tab.Screen
                  key={`${category.id}${category.title}`}
                  name={category.id}
                  component={TaskScreen}
                  initialParams={{ categoryId: category.id }}
                />
              ))}
            </Tab.Navigator>
          ) : null}
        </View>
      </BottomTab>
    </View>
  )
}

const enhance = withObservables(["categories"], () => ({
  categories: CategoryDB.query(),
}))
export const EnhancedTopTabNavigator = enhance(TopTabNavigator)
