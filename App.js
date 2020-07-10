import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";

import { GoalProvider } from "./context/GoalContext";
import { JournalProvider } from "./context/JournalContext";

import AppNavigator from "./navigation";

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={Theme}>
      <SafeAreaProvider>
        <MenuProvider>
          <JournalProvider>
            <GoalProvider>
              <AppNavigator />
            </GoalProvider>
          </JournalProvider>
        </MenuProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
