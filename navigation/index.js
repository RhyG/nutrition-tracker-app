import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import styles from "../config/globalStyles";
import Sidebar from "../components/SideMenu";
import BurgerMenu from "../components/BurgerMenu";

import FoodJournal from "../screens/FoodJournal/FoodJournalScreen";
import Conversions from "../screens/ConversionsScreen";
import Goals from "../screens/Goals/GoalsScreen";
import WeeklyOverview from "../screens/WeeklyOverview/WeeklyOverviewScreen";

const { headerStyle, headerLeftContainerStyle, darkBlue } = styles;

const drawerStyle = {
  backgroundColor: darkBlue,
};

const Drawer = createDrawerNavigator();

const headerOptions = (props) => ({
  headerStyle,
  headerLeftContainerStyle,
  headerLeft: () => <BurgerMenu navigation={props.navigation} />,
  headerTitleAlign: "center",
});

const JournalNavigator = () => <FoodJournal headerOptions={headerOptions} />;
const ConversionsNavigator = () => <Conversions headerOptions={headerOptions} />;
const GoalsNavigator = () => <Goals headerOptions={headerOptions} />;
const WeeklyOverviewNavigator = () => <WeeklyOverview headerOptions={headerOptions} />;

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
        <Drawer.Screen name="Weekly Overview" component={WeeklyOverviewNavigator} />
        <Drawer.Screen name="Goals" component={GoalsNavigator} />
        <Drawer.Screen name="Conversions" component={ConversionsNavigator} />
      </Drawer.Navigator>
      <Sidebar />
    </>
  );
};

export default AppNavigator;
