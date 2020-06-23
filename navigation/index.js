import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import styles from "../config/globalStyles";
import Sidebar from "../components/SideMenu";
import BurgerMenu from "../components/BurgerMenu";

import FoodJournal from "../screens/FoodJournal/FoodJournal";
import Conversions from "../screens/Conversions";

const { headerStyle, headerLeftContainerStyle } = styles;

const headerOptions = {
  headerStyle,
  headerLeftContainerStyle,
  // headerLeft: () => <BurgerMenu />,
  headerTitleAlign: "center",
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Root = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Food Journal"
        component={FoodJournal}
        options={(props) => ({
          title: "Food Journal",
          headerLeft: () => <BurgerMenu navigation={props.navigation} />,
          ...headerOptions,
        })}
      />
      <Stack.Screen name="Conversions" component={Conversions} options={{ ...headerOptions }} />
    </Stack.Navigator>
  );
};

const AppNavigator = ({ navigation }) => {
  return (
    <>
      <Drawer.Navigator initialRouteName="Food Journal">
        {/* <Drawer.Screen
          name="Food Journal"
          component={FoodJournal}
          options={{
            title: "Food Journal",
            ...headerOptions,
          }}
        />
        <Drawer.Screen name="Conversions" component={Conversions} options={{ ...headerOptions }} /> */}
        <Drawer.Screen name="Conversions" component={Root} options={{ ...headerOptions }} />
      </Drawer.Navigator>
      <Sidebar />
    </>
  );
};

export default AppNavigator;
