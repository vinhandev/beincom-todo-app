import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: "red",
  },
  tab: {
    height: 70,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    padding: 16,

    borderWidth: 0.5,
  },
  tabContent: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
})
