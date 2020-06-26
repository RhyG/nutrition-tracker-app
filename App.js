import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";

import { GoalProvider } from "./context/GoalContext";
import { JournalProvider } from "./context/JournalContext";

import AppNavigator from "./navigation";

export default function App() {
  return (
    <NavigationContainer>
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
