import { Button, Text, View } from "react-native"

import { useTranslation } from "react-i18next"

import { useTheme } from "@/theme"

import { styles } from "./SettingScreen.style"

export default function SettingScreen() {
  const { variant, changeTheme } = useTheme()
  const { t, i18n } = useTranslation("setting")
  function handleChangeTheme() {
    changeTheme(variant === "default" ? "dark" : "default")
  }

  function handleChangeLanguage() {
    i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi")
  }

  return (
    <View style={styles.container}>
      <Button title={t("THEME_TITLE", { theme: variant })} onPress={handleChangeTheme} />
      <Button title={t("LANGUAGE_TITLE", { lng: i18n.language })} onPress={handleChangeLanguage} />
    </View>
  )
}
