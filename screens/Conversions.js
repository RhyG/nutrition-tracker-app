import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

const calToKj = (cal) => Math.round(cal * 4.184);
const kjToCal = (kj) => Math.round(kj * 0.239006);

export default function Conversions() {
  const [kj, setKj] = useState(0);
  const [calories, setCalories] = useState(0);

  const handleCalorieChange = (x) => {
    setKj(calToKj(Number(x)));
    setCalories(x);
  };

  const handleKilojouleChange = (x) => {
    setCalories(kjToCal(Number(x)));
    setKj(x);
  };

  return (
    <View>
      <Text>Calories: {calories}</Text>
      <Text>Kilojoules: {kj}</Text>
      <TextInput placeholder="Calories" onChangeText={handleCalorieChange} />
      <TextInput placeholder="Kilojoules (kj)" onChangeText={handleKilojouleChange} />
    </View>
  );
}
