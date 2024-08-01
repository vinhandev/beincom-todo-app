import { Text, View } from "react-native"

import { useTheme } from "@/theme"

export default function HomeScreen() {
  const { fonts } = useTheme()
  console.log(fonts.family_400, fonts.family_700)
  return (
    <View>
      <Text style={[fonts.size_32, fonts.family_700]}>HomeScreen</Text>
    </View>
  )
}
