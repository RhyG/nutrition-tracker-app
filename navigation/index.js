import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Entypo } from "react-native-vector-icons";

import styles from "../config/globalStyles";
import Sidebar from "../components/SideMenu";
import BurgerMenu from "../components/BurgerMenu";

import FoodJournal from "../screens/FoodJournal/FoodJournalScreen";
import Conversions from "../screens/Conversions";

const { headerStyle, headerLeftContainerStyle, darkBlue } = styles;

const drawerStyle = {
  backgroundColor: darkBlue,
};

// const headerOptions = {
//   headerStyle,
//   headerLeftContainerStyle,
//   // headerLeft: () => <BurgerMenu />,
//   headerTitleAlign: "center",
// };

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const headerOptions = (props) => ({
  headerStyle,
  headerLeftContainerStyle,
  headerLeft: () => <BurgerMenu navigation={props.navigation} />,
  // headerRight: () => <Entypo name="dots-three-vertical" size={22} color={styles.darkGrey} />,
  headerTitleAlign: "center",
});

const JournalNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Food Journal" component={FoodJournal} options={headerOptions} />
    </Stack.Navigator>
  );
};

const ConversionsNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Conversions" component={Conversions} options={headerOptions} />
    </Stack.Navigator>
  );
};

const AppNavigator = ({ navigation }) => {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="Food Journal"
        drawerStyle={drawerStyle}
        overlayColor="transparent"
        drawerContentOptions={{
          activeBackgroundColor: "#2C3949",
          itemStyle: { width: "100%", marginLeft: 0, paddingLeft: 20 },
          labelStyle: { color: "#fff", fontWeight: "bold" },
          contentContainerStyle: { paddingTop: 120 },
        }}
      >
        <Drawer.Screen name="Food Journal" component={JournalNavigator} />
        <Drawer.Screen name="Conversions" component={ConversionsNavigator} />
      </Drawer.Navigator>
      <Sidebar />
    </>
  );
};

export default AppNavigator;
