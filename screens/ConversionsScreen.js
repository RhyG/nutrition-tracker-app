import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import globalStyles from "../config/globalStyles";
import { calToKj, kjToCal, isInputNumber } from "../lib/helpers";

const { offWhite, darkGrey } = globalStyles;

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 20 },
  fieldsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fieldContainer: {
    width: "48%",
  },
  title: {
    color: darkGrey,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: offWhite,
    padding: 10,
    borderRadius: 6,
    // fontWeight: "bold",
    fontSize: 18,
  },
  fieldLabel: {
    color: darkGrey,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  caption: {
    marginTop: 20,
    fontSize: 16,
  },
});

function Conversions() {
  const [kj, setKj] = useState("4.184");
  const [calories, setCalories] = useState("1");

  const handleCalorieChange = (value) => {
    if (!isInputNumber(value)) return;
    setKj(calToKj(Number(value)));
    setCalories(value);
  };

  const handleKilojouleChange = (value) => {
    if (!isInputNumber(value)) return;
    setCalories(kjToCal(Number(value)));
    setKj(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.convertEnergyContainer}>
        <Text style={styles.title}>Convert Kilojoules to Calories</Text>
        <View style={styles.fieldsContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Calories</Text>
            <TextInput
              style={styles.input}
              placeholder="Calories"
              onChangeText={handleCalorieChange}
              value={String(calories)}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Kilojoules</Text>
            <TextInput
              style={styles.input}
              placeholder="Kilojoules (kj)"
              onChangeText={handleKilojouleChange}
              value={String(kj)}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <Text style={styles.caption}>Formula: 1 Cal = 4.184 kJ, rounded to the nearest whole number</Text>
      </View>
    </View>
  );
}

const ConversionsNavigator = ({ headerOptions, navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Conversions" component={Conversions} options={headerOptions} />
  </Stack.Navigator>
);

export default ConversionsNavigator;
