import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Feather } from "react-native-vector-icons";

import globalStyles from "../config/globalStyles";
const { green, darkGrey } = globalStyles;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    borderColor: green,
    borderWidth: 2,
    height: 20,
    width: 20,
    borderRadius: 4,
  },
  label: {
    color: darkGrey,
    marginLeft: 10,
  },
});

export default function RadioButton({ selected, label, containerStyle, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.radioOuter}>{selected && <Feather name="check" color={green} size={15} />}</View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
