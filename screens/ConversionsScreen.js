import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DropDownPicker from "react-native-dropdown-picker";

import globalStyles from "../config/globalStyles";
import { calToKj, kjToCal, isInputNumber } from "../lib/helpers";
import RadioButton from "../components/RadioButton";
import Button from "../components/Button";

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
  },
  contentContainer: {
    paddingHorizontal: 20,
    flex: 1,
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
  radiosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  resultContainer: {
    height: 22,
    ...mtop20,
  },
  result: {
    color: darkGrey,
    fontSize: 18,
  },
  buttonContainer: {
    ...mtop20,
    paddingVertical: Platform.OS === "android" ? 12 : 0,
  },
});

const defaultData = { age: "", weight: "", height: "", gender: "M", activityMultiplier: 1.2 };

function Conversions() {
  const [activityLevel, setActivityLevel] = useState(activityLevels[0]);
  const [data, setData] = useState(defaultData);
  const [TDEE, setTDEE] = useState();

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
    if (["age", "height", "weight"].includes(property)) {
      if (!isInputNumber(value)) return;
    }

    setData((prevData) => ({
      ...prevData,
      [property]: value,
    }));
  };

  const calculateTDEE = () => {
    const { age, weight, height, gender, activityMultiplier } = data;

    if (!age || !weight || !height || !activityMultiplier) {
      return;
    }

    const genderVariable = gender === "M" ? 5 : -161;

    const BMR = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + genderVariable;
    const TDEE = BMR * Number(activityMultiplier);
    setTDEE(Math.round(TDEE));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={80}
    >
      <View style={styles.contentContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={styles.tdeeContainer}>
              <Text style={styles.title}>Calculate TDEE</Text>
              <View style={styles.tdeeFields}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Age</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="26"
                    onChangeText={(text) => handleCalculatorChange("age", text)}
                    value={String(data.age)}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Weight (kg)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="74kg"
                    onChangeText={(text) => handleCalculatorChange("weight", text)}
                    value={String(data.weight)}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={[styles.fieldLabel, mtop20]}>Height (cm)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="178cm"
                    onChangeText={(text) => handleCalculatorChange("height", text)}
                    value={String(data.height)}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={[styles.fieldContainer, mtop20]}>
                  <Text style={styles.fieldLabel}>Gender</Text>
                  <View style={styles.radiosContainer}>
                    <RadioButton
                      label="Male"
                      selected={data.gender === "M"}
                      onPress={() => handleCalculatorChange("gender", "M")}
                    />
                    <RadioButton
                      label="Female"
                      selected={data.gender === "F"}
                      onPress={() => handleCalculatorChange("gender", "F")}
                    />
                  </View>
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
              <Button
                title="Calculate TDEE"
                onPress={calculateTDEE}
                buttonStyle="green"
                style={[styles.buttonContainer]}
              >
                Calculate TDEE
              </Button>
              <View style={[styles.resultContainer]}>
                {TDEE && <Text style={[styles.result]}>Your TDEE is {TDEE} calories</Text>}
              </View>
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
              <Text style={styles.caption}>
                Formula: 1 Cal = 4.184 kJ, rounded to the nearest whole number
              </Text>
            </View>
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
}

const ConversionsNavigator = ({ headerOptions, navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Calculators" component={Conversions} options={headerOptions} />
  </Stack.Navigator>
);

export default ConversionsNavigator;
