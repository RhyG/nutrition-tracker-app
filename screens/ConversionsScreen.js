import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DropDownPicker from "react-native-dropdown-picker";

import globalStyles from "../config/globalStyles";
import { calToKj, kjToCal, isInputNumber } from "../lib/helpers";

const { offWhite, darkGrey, mtop10, mtop20 } = globalStyles;

const Stack = createStackNavigator();

// give callback to fiat team they accept no matter what and credit that amount to user. If it does break do we generate POLi URL based on $5

const activityLevels = [
  {
    label: "Sedentary (little to no exercise + work a desk job)",
    value: "Sedentary (little to no exercise + work a desk job)",
    multiplier: 1.2,
  },
  {
    label: "Lightly active (light exercise 1-3 days / week)",
    value: "Lightly active (light exercise 1-3 days / week)",
    multiplier: 1.375,
  },
  {
    label: "Moderately active (moderate exercise 3-5 days / week)",
    value: "Moderately active (moderate exercise 3-5 days / week)",
    multiplier: 1.55,
  },
  {
    label: "Very active (heavy exercise 6-7 days / week)",
    value: "Very active (heavy exercise 6-7 days / week)",
    multiplier: 1.725,
  },
  {
    label: "Extremely active (very heavy exercise, hard labor job, training 2x / day)",
    value: "Extremely active (very heavy exercise, hard labor job, training 2x / day)",
    multiplier: 1.9,
  },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
  },
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
  tdeeFields: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  convertEnergyContainer: {
    zIndex: -5,
  },
  pickerLabel: {
    color: darkGrey,
    fontSize: 16,
  },
});

function Conversions() {
  const [activityLevel, setActivityLevel] = useState(activityLevels[0]);
  const [data, setData] = useState({ age: "", weight: "", height: "", gender: "M", activityMultiplier: 0 });

  const [kj, setKj] = useState("");
  const [calories, setCalories] = useState("");

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

  const handleCalculatorChange = (property, value) => {
    setData((prevData) => ({
      ...prevData,
      [property]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tdeeContainer}>
        <Text style={styles.title}>Calculate TDEE</Text>
        <View style={styles.tdeeFields}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Age"
              onChangeText={(text) => handleCalculatorChange("age", text)}
              value={String(data.age)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Weight</Text>
            <TextInput
              style={styles.input}
              placeholder="Weight"
              onChangeText={(text) => handleCalculatorChange("weight", text)}
              value={String(data.weight)}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, mtop20]}>Height</Text>
            <TextInput
              style={styles.input}
              placeholder="Height"
              onChangeText={(text) => handleCalculatorChange("height", text)}
              value={String(data.height)}
            />
          </View>
        </View>
        <Text style={[styles.fieldLabel, mtop20]}>Activity level</Text>
        <DropDownPicker
          items={activityLevels}
          defaultValue={activityLevel.value}
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa" }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => {
            setActivityLevel(item);
            handleCalculatorChange("activityMultiplier", item.multiplier);
          }}
          labelStyle={styles.pickerLabel}
        />
      </View>
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
