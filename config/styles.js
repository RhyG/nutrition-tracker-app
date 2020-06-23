import { StyleSheet, Platform } from "react-native";

const colours = {};

const GlobalStyles = StyleSheet.create({
  headerStyle: {
    shadowColor: "transparent",
    elevation: 0,
    borderBottomWidth: 0,
    backgroundColor: "#f5f5f5",
  },
  headerLeftContainerStyle: {
    marginLeft: Platform.OS === "ios" ? 20 : 20,
  },
  p20: { padding: 20 },
  phorizontal20: { paddingHorizontal: 20 },
});

export default { ...GlobalStyles, ...colours };
