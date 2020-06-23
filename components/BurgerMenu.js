import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  menuBar: {
    backgroundColor: "#2c2c2c",
    height: 3,
    width: 25,
    marginBottom: 5,
    borderRadius: 2,
  },
});

export default function BurgerMenu() {
  return (
    <TouchableOpacity style={styles.menuContainer}>
      <View style={styles.menuBar} />
      <View style={styles.menuBar} />
      <View style={styles.menuBar} />
    </TouchableOpacity>
  );
}
