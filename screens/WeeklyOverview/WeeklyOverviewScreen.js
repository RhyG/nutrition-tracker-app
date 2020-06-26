import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import GoalContext from "../../context/GoalContext";
import JournalContext from "../../context/JournalContext";
import { calcHeight, getCurrentCalories, getCurrentProtein } from "../../lib/helpers";
import globalStyles from "../../config/globalStyles";

const { green, red, darkGrey, mtop60, mtop20 } = globalStyles;

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 25,
  },
  contentContainer: {},
  statNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    width: "45%",
    color: darkGrey,
  },
  titleAndNumber: {},
  numberTitle: {
    color: "#a9a9a9",
  },
  number: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: -3,
    color: darkGrey,
  },
  barsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  bars: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  barContainer: {
    width: 35,
    alignItems: "center",
  },
  barOuter: {
    height: 140,
    width: 15,
    borderRadius: 6,
    backgroundColor: "#E8E8E8",
    justifyContent: "flex-end",
  },
  barInner: {
    borderRadius: 6,
  },
  day: {
    marginTop: 8,
    color: darkGrey,
    fontSize: 16,
  },
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const getAverages = (data = {}) => {
  const dailyTotals = Object.keys(data).map((key, i) => {
    const dailyTotal = data[key].reduce(
      (acc, curr) => ({
        calories: Number(acc.calories) + Number(curr.calories),
        protein: Number(acc.protein) + Number(curr.protein),
      }),
      { calories: 0, protein: 0 }
    );

    return dailyTotal;
  });

  const calories = Math.round(dailyTotals.reduce((a, c) => a + c.calories, 0) / 7);
  const protein = Math.round(dailyTotals.reduce((a, c) => a + c.protein, 0) / 7);

  return { calories, protein };
};

function WeeklyOverview() {
  const [averages, setAverages] = useState({ claories: 0, protein: 0 });

  const { goals } = useContext(GoalContext);
  const { journalData } = useContext(JournalContext);

  useEffect(() => {
    setAverages(getAverages(journalData));
  }, [journalData]);

  const Bar = ({ day, type }) => {
    const todayFood = journalData[day] || [];

    let amount;

    if (type === "calories") {
      amount = getCurrentCalories(todayFood);
    } else {
      amount = getCurrentProtein(todayFood);
    }

    return (
      <View style={styles.barContainer}>
        <View style={styles.barOuter}>
          <View
            style={[
              styles.barInner,
              {
                backgroundColor: type === "calories" && amount > goals[type] ? red : green,
                height: `${calcHeight(goals[type], amount)}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.day}>{day.substring(0, 3)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <View style={[styles.contentContainer, mtop20]}>
        <View style={styles.statNumbers}>
          <Text style={styles.title}>Calories</Text>
          <View style={styles.titleAndNumber}>
            <Text style={styles.numberTitle}>Average</Text>
            <Text style={styles.number}>{averages.calories}</Text>
          </View>
          <View style={styles.titleAndNumber}>
            <Text style={styles.numberTitle}>Goal</Text>
            <Text style={styles.number}>{goals.calories}</Text>
          </View>
        </View>
        <View style={styles.barsContainer}>
          <View style={styles.bars}>
            {days.map((day, index) => {
              return <Bar day={day} key={index} type="calories" />;
            })}
          </View>
        </View>
      </View>
      <View style={[styles.contentContainer, mtop60]}>
        <View style={styles.statNumbers}>
          <Text style={styles.title}>Protein</Text>
          <View style={styles.titleAndNumber}>
            <Text style={styles.numberTitle}>Average</Text>
            <Text style={styles.number}>{averages.protein}</Text>
          </View>
          <View style={styles.titleAndNumber}>
            <Text style={styles.numberTitle}>Goal</Text>
            <Text style={styles.number}>{goals.protein}</Text>
          </View>
        </View>
        <View style={styles.barsContainer}>
          <View style={styles.bars}>
            {days.map((day, index) => {
              return <Bar day={day} key={index} type="protein" />;
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

const WeeklyOverviewNavigator = ({ headerOptions, navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Weekly Overview" component={WeeklyOverview} options={headerOptions} />
  </Stack.Navigator>
);

export default WeeklyOverviewNavigator;
