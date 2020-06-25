import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const GoalsStack = createStackNavigator();

export default function GoalsScreen() {
  return (
    <View>
      <Text>Goals</Text>
    </View>
  );
}
