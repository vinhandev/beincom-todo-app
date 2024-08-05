import { Button, Text, TouchableOpacity, View } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"

import { useTheme } from "@/theme"
import ArrowIcon from "@/theme/assets/svg/ArrowIcon"

import { styles } from "./SettingScreen.style"

export default function SettingScreen() {
  const navigation = useNavigation()
  const { variant, changeTheme, backgrounds, components, fonts, gutters } = useTheme()
  const { t, i18n } = useTranslation("setting")
  function handleChangeTheme() {
    changeTheme(variant === "default" ? "dark" : "default")
  }

  function handleChangeLanguage() {
    i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi")
  }

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <View style={[styles.container, backgrounds.gray500]}>
      <View
        style={[
          {
            width: "100%",
            height: 50,
            flexDirection: "row",
            alignItems: "center",
          },
          backgrounds.white,
          components.shadow,
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{
            transform: [{ rotate: "90deg" }],
            width: 44,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowIcon width={18} height={18} />
        </TouchableOpacity>
        <Text style={[fonts.family_700, fonts.black, fonts.size_16]}>General Settings</Text>
      </View>
      <View style={[gutters.marginTop_12]}>
        <TouchableOpacity
          style={[backgrounds.white, gutters.paddingHorizontal_16, gutters.paddingVertical_12]}
          onPress={handleChangeTheme}
        >
          <Text style={[fonts.black, fonts.size_16, fonts.family_700]}>
            {t("THEME_TITLE", { theme: variant })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[backgrounds.white, gutters.paddingHorizontal_16, gutters.paddingVertical_12]}
          onPress={handleChangeLanguage}
        >
          <Text style={[fonts.black, fonts.size_16, fonts.family_700]}>
            {t("LANGUAGE_TITLE", { lng: i18n.language })}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
