import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import GoalContext from "../../context/GoalContext";

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },
});

function GoalsScreen() {
  const { goals, updateGoals } = useContext(GoalContext);
  const [inputs, setInputs] = useState(goals || { calories: "", protein: "" });

  const handleChange = (name, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: Number(value),
    }));
  };

  const saveGoals = () => {
    updateGoals(inputs);
  };

  return (
    <View style={styles.screenContainer}>
      <Text>Calories</Text>
      <TextInput
        onChangeText={(text) => handleChange("calories", text)}
        keyboardType="number-pad"
        value={String(inputs.calories)}
        onBlur={() => console.log("wow")}
      />
      <Text>Protein</Text>
      <TextInput
        onChangeText={(text) => handleChange("protein", text)}
        keyboardType="number-pad"
        value={String(inputs.protein)}
      />
      <Text onPress={saveGoals}>SAVE</Text>
    </View>
  );
}

const GoalsNavigator = ({ headerOptions, navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Goals" component={GoalsScreen} options={headerOptions} />
  </Stack.Navigator>
);

export default GoalsNavigator;
