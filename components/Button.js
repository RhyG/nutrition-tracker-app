import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

import globalStyles from "../config/globalStyles";

const { green, fontLightGrey } = globalStyles;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  touchable: {
    // paddingVertical: 10,
    // paddingHorizontal: 24,
  },
});

const buttonStyles = {
  green: {
    container: {
      backgroundColor: green,
    },
    label: {
      color: "#fff",
    },
  },
  transparent: {
    label: {
      color: fontLightGrey,
    },
  },
};

export default function CustomButton({ children, style, onPress, buttonStyle, labelStyle }) {
  const Touchable = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

  const Background =
    Platform.OS === "ios" ? null : TouchableNativeFeedback.Ripple("rgba(0, 0, 0, 0.1)", true);

  return (
    <Touchable background={Background} onPress={onPress} style={styles.touchable} activeOpacity={0.7}>
      <View style={[styles.buttonContainer, style, buttonStyles[buttonStyle].container]}>
        <Text style={[buttonStyles[buttonStyle].label, styles.buttonText, labelStyle]}>{children}</Text>
      </View>
    </Touchable>
  );
}
