import { useEffect, useRef } from "react"
import { Button, ScrollView, Text, View } from "react-native"

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
import { LogoIcon } from "@/theme/assets/svg"

import { SettingButton } from "@/components/atoms"
import { BottomTab } from "@/components/template"

import Category from "@/models/category.model"
import { TaskScreen } from "@/screens"
import { CategoryDB, useAddCategory } from "@/services/queries/category"

const Tab = createMaterialTopTabNavigator()

function TopTabNavigator({ categories }: { categories: Category[] }) {
  const addingListRef = useRef<BottomSheetModal>(null)
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "TopTab">>()
  const { components, fonts, gutters, borders, backgrounds } = useTheme()
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
      <TabBar
        {...tabBarProps}
        scrollEnabled
        bounces
        navigationState={tabBarProps.state}
        indicatorStyle={backgrounds.purple500}
        tabStyle={{
          padding: 0,
          margin: 0,
          width: 120,
        }}
        style={{ backgroundColor: "white" }}
        renderLabel={(props) => {
          const name =
            tabBarProps.categories.find((item) => item.id === props.route.name)?.title ?? ""

          console.log(name, props.focused)
          return (
            <Text
              style={[
                props.focused ? fonts.purple700 : fonts.gray700,
                fonts.family_700,
                fonts.size_16,
                fonts.alignCenter,
              ]}
            >
              {name}
            </Text>
          )
        }}
      />
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
          style={[
            { flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
            gutters.paddingHorizontal_16,
            gutters.paddingVertical_12,
            borders.gray600,
            borders.wBottom_2,
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 1 }}>
            <LogoIcon />
            <Text style={[fonts.purple500, fonts.family_700, fonts.size_24]}>todoapp</Text>
          </View>
          <SettingButton onPress={handleNavigateSetting} />
        </View>
        <View style={[{ flex: 1 }, components.shadow, gutters.paddingTop_12]}>
          {categories && categories.length > 0 ? (
            <Tab.Navigator
              key={categories.toString()}
              tabBar={(props) => <TabBarHeader categories={categories} {...props} />}
            >
              {categories.map((category) => (
                <Tab.Screen
                  key={category.id}
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
