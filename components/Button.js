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

const { green } = globalStyles;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: green,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    // letterSpacing: 1,
    fontSize: 16,
  },
});

export default function CustomButton({ children, title, onPress }) {
  const Touchable = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

  const Background =
    Platform.OS === "ios" ? null : TouchableNativeFeedback.Ripple("rgba(0, 0, 0, 0.1)", true);

  return (
    <View style={styles.buttonContainer}>
      <Touchable background={Background} onPress={onPress}>
        <Text style={styles.buttonText}>{children}</Text>
      </Touchable>
    </View>
  );
}
