import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

const calToKj = (cal) => Math.round(cal * 4.184);
const kjToCal = (kj) => Math.round(kj * 0.239006);

export default function Conversions() {
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
