import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Entypo } from "react-native-vector-icons";

import globalStyles from "../config/globalStyles";

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function BurgerMenu({ navigation }) {
  return (
    <TouchableOpacity style={styles.menuContainer} onPress={() => navigation.openDrawer()}>
      <Entypo name="menu" size={30} color={globalStyles.darkGrey} />
    </TouchableOpacity>
  );
}
