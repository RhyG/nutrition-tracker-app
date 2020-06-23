import { StyleSheet, Platform } from "react-native";

const colours = {
  darkGrey: "#2c2c2c",
  green: "#3ECF8E",
  offWhite: "#f5f5f5",
  lightGrey: "#efefef",
  darkBlue: "#2D3E4E",
};

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
  mtop20: { marginTop: 20 },
  p20: { padding: 20 },
  phorizontal20: { paddingHorizontal: 20 },
  fontWhite: { color: "#fff" },
  fontBold: { fontWeight: "bold" },
});

export default { ...GlobalStyles, ...colours };
