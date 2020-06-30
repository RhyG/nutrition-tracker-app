import React, { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import GoalContext from "../../context/GoalContext";
import globalStyles from "../../config/globalStyles";
import { isInputNumber } from "../../lib/helpers";

const { darkGrey, offWhite, mtop20 } = globalStyles;

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },
  caption: {
    color: darkGrey,
    fontSize: 14,
    lineHeight: 20,
    ...mtop20,
  },
  title: {
    color: darkGrey,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: offWhite,
    padding: 10,
    borderRadius: 6,
    fontSize: 18,
  },
  fieldsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    ...mtop20,
  },
  fieldContainer: {
    width: "48%",
    justifyContent: "center",
  },
});

function GoalsScreen() {
  const { goals, updateGoals } = useContext(GoalContext);
  const [inputs, setInputs] = useState(goals || { calories: "", protein: "" });

  const handleChange = (name, value) => {
    if (!isInputNumber(value)) return;

    setInputs((prevInputs) => {
      const newGoals = {
        ...prevInputs,
        [name]: Number(value),
      };

      updateGoals(newGoals);

      return newGoals;
    });
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.fieldsContainer}>
        <View style={styles.fieldContainer}>
          <Text style={styles.title}>Calories</Text>
          <TextInput
            onChangeText={(text) => handleChange("calories", text)}
            keyboardType="number-pad"
            value={String(inputs.calories)}
            style={styles.input}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={[styles.title]}>Protein</Text>
          <TextInput
            onChangeText={(text) => handleChange("protein", text)}
            keyboardType="number-pad"
            value={String(inputs.protein)}
            style={styles.input}
          />
        </View>
      </View>
      <Text style={styles.caption}>
        Goals will automatically update and are used to track your progress in the journal and weekly
        overview.
      </Text>
    </View>
  );
}

const GoalsNavigator = ({ headerOptions, navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Goals" component={GoalsScreen} options={headerOptions} />
  </Stack.Navigator>
);

export default GoalsNavigator;
