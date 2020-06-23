import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

import globalStyles from "../config/globalStyles";
const { darkBlue, fontWhite, fontBold, mtop20 } = globalStyles;

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  menu: {
    width: window.width * 0.5,
    height: window.height,
    backgroundColor: darkBlue,
    flex: 1,
    padding: 20,
    paddingTop: 100,
  },
});

const Menu = () => (
  <View style={styles.menu}>
    <Text style={[fontWhite, fontBold]}>Journal</Text>
    <Text style={[fontWhite, fontBold, mtop20]}>Calculators</Text>
  </View>
);

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const menu = <Menu />;

  return null;
}
