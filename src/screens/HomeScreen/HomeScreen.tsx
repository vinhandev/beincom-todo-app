import { useEffect } from "react"
import { Text, View } from "react-native"

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

import { useTheme } from "@/theme"

export default function HomeScreen() {
  const { fonts } = useTheme()

  const animatedValue = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    }
  })

  useEffect(() => {
    animatedValue.value = withTiming(1, { duration: 1000 })
  }, [])

  return (
    <View>
      <Animated.Text style={[fonts.size_32, fonts.family_700, fonts.black, animatedStyle]}>
        HomeScreen
      </Animated.Text>
    </View>
  )
}
