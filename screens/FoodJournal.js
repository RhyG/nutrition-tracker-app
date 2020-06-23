import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "react-native-vector-icons";
import { getDay } from "date-fns";

import GlobalStyles from "../config/styles";
const { phorizontal20 } = GlobalStyles;

const styles = StyleSheet.create({
  container: {
    ...phorizontal20,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  dayContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  day: {
    fontSize: 20,
  },
  statsContainer: {
    height: 180,
  },
  mealRowsContainer: {
    backgroundColor: "#fff",
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const getTodayIndex = () => getDay(new Date()) - 1;

export default function FoodJournal({ navigation }) {
  const [day, setDay] = useState(getTodayIndex());

  const handleDayChange = (direction) => {
    switch (direction) {
      case "left":
        if (day > 0) {
          setDay(day - 1);
          return;
        } else {
          return;
        }
      case "right":
        if (day < 6) {
          setDay(day + 1);
          return;
        } else {
          return;
        }
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.dayContainer}>
          <TouchableOpacity>
            <AntDesign name="left" size={22} color="#2c2c2c" onPress={() => handleDayChange("left")} />
          </TouchableOpacity>
          <Text style={[styles.day]}>{days[day]}</Text>
          <TouchableOpacity>
            <AntDesign name="right" size={22} color="#2c2c2c" onPress={() => handleDayChange("right")} />
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}></View>
      </View>
      <View style={styles.mealRowsContainer}></View>
    </View>
  );
}
