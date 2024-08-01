import { Button, Text, View } from "react-native"

import { useTranslation } from "react-i18next"

import { useTheme } from "@/theme"

import { styles } from "./SettingScreen.style"

export default function SettingScreen() {
  const { variant, changeTheme } = useTheme()
  const { t, i18n } = useTranslation()
  function handleChangeTheme() {
    changeTheme(variant === "default" ? "dark" : "default")
  }

  function handleChangeLanguage() {
    i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr")
  }

  return (
    <View style={styles.container}>
      <Button title={`Theme: ${variant}`} onPress={handleChangeTheme} />
      <Button title={`Language: ${i18n.language}`} onPress={handleChangeLanguage} />
    </View>
  )
}
