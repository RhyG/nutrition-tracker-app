import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { calToKj, kjToCal } from "../lib/helpers";

const Stack = createStackNavigator();

function Conversions() {
  const [kj, setKj] = useState("");
  const [calories, setCalories] = useState("");

  const handleCalorieChange = (x) => {
    setKj(calToKj(Number(x)));
    setCalories(x);
  };

  const handleKilojouleChange = (x) => {
    setCalories(kjToCal(Number(x)));
    setKj(x);
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1, padding: 20 }}>
      <Text>Calories: {calories}</Text>
      <Text>Kilojoules: {kj}</Text>
      <TextInput placeholder="Calories" onChangeText={handleCalorieChange} />
      <TextInput placeholder="Kilojoules (kj)" onChangeText={handleKilojouleChange} />
    </View>
  );
}

const ConversionsNavigator = ({ headerOptions, navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Conversions" component={Conversions} options={headerOptions} />
  </Stack.Navigator>
);

export default ConversionsNavigator;
