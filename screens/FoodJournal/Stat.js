import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { calcRemaining, calcWidth } from "../../lib/helpers";

import globalStyles from "../../config/globalStyles";
const { fontDark, green, red, fontBold } = globalStyles;

const styles = StyleSheet.create({
  statContainer: {
    // paddingVertical: 20,
  },
  title: {
    ...fontDark,
    ...fontBold,
    fontSize: 18,
  },
  remaining: {
    color: "#887C7C",
    fontSize: 16,
  },
  topText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    alignItems: "flex-end",
  },
  progressBarOuter: {
    backgroundColor: "#DCDCDC",
    height: 25,
    borderRadius: 8,
    position: "relative",
  },
  progressBarInner: {
    height: 25,
    // backgroundColor: green,
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
    fontSize: 16,
  },
});

export default function Stat({ name = "Calories", max = 3000, current = 1500, style }) {
  return (
    <View style={[styles.statContainer, style]}>
      <View style={styles.topText}>
        <Text style={[styles.title]}>{name}</Text>
        <Text style={styles.remaining}>{calcRemaining(max, current)} remaining</Text>
      </View>
      <View style={styles.progressBarOuter}>
        <View style={styles.textContainer}>
          <Text style={styles.progressText}>
            {current} / {max}
          </Text>
        </View>
        <View
          style={[
            styles.progressBarInner,
            { width: `${calcWidth(max, current)}%`, backgroundColor: current > max ? red : green },
          ]}
        />
      </View>
    </View>
  );
}
