import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import styles from "../config/styles";
import BurgerMenu from "../components/BurgerMenu";

import FoodJournal from "../screens/FoodJournal";
import Conversions from "../screens/Conversions";

const { headerStyle, headerLeftContainerStyle } = styles;

const headerOptions = {
  headerStyle,
  headerLeftContainerStyle,
  headerLeft: () => <BurgerMenu />,
  headerTitleAlign: "center",
};

const Stack = createStackNavigator();

const AppNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Food Journal">
      <Stack.Screen
        name="Food Journal"
        component={FoodJournal}
        options={{
          title: "Food Journal",
          ...headerOptions,
        }}
      />
      <Stack.Screen name="Conversions" component={Conversions} options={{ headerStyle }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
