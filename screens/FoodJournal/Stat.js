import React from "react";
import { View, Text, StyleSheet } from "react-native";

import globalStyles from "../../config/globalStyles";
const { fontDark, green, fontBold } = globalStyles;

const styles = StyleSheet.create({
  statContainer: {
    // paddingVertical: 20,
  },
  topText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  progressBarOuter: {
    backgroundColor: "#DCDCDC",
    height: 25,
    borderRadius: 8,
    position: "relative",
  },
  progressBarInner: {
    height: 25,
    backgroundColor: green,
    borderRadius: 8,
    zIndex: 1,
  },
  textContainer: {
    position: "absolute",
    zIndex: 9,
    height: 25,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    left: "50%",
    marginLeft: -50,
  },
  progressText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const calculateRemaining = (max, current) => max - current;
const calcWidth = (max, current) => (current / max) * 100;

export default function Stat({ name = "Calories", max = 3000, current = 1500 }) {
  return (
    <View style={styles.statContainer}>
      <View style={styles.topText}>
        <Text style={[fontDark, fontBold]}>{name}</Text>
        <Text style={{ color: "#887C7C" }}>{calculateRemaining(max, current)} remaining</Text>
      </View>
      <View style={styles.progressBarOuter}>
        <View style={styles.textContainer}>
          <Text style={styles.progressText}>
            {current} / {max}
          </Text>
        </View>
        <View style={[styles.progressBarInner, { width: `${calcWidth(max, current)}%` }]} />
      </View>
    </View>
  );
}
