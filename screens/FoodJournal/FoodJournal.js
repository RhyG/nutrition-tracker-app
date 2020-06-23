import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import ActionButton from "react-native-action-button";
import { AntDesign } from "react-native-vector-icons";
import { getDay } from "date-fns";

import useIsInitialRender from "../../hooks/useIsInitialRender";
import storage from "../../lib/async-storage";
import NewItemModal from "./NewItemModal";

import styles, { width50 } from "./styles";
const {
  container,
  dayContainer,
  day,
  statsContainer,
  mealRowsContainer,
  tableHeadings,
  tableHeading,
  foodHeading,
  tableData,
  rowContainer,
  newItemModal,
} = styles;

import GlobalStyles from "../../config/globalStyles";
const { green, darkGrey } = GlobalStyles;

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const getTodayIndex = () => getDay(new Date()) - 1;

const defaultData = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
};

const FoodRow = ({ item }) => {
  const { food, calories, protein } = item;

  return (
    <View style={rowContainer}>
      <Text style={[width50]}>{food}</Text>
      <Text>{calories}</Text>
      <Text>{protein}</Text>
    </View>
  );
};

export default function FoodJournal({ navigation }) {
  const [day, setDay] = useState(getTodayIndex());
  const [modalVisible, setModalVisible] = useState(false);

  const [items, setItems] = useState(defaultData);

  const isInitialRender = useIsInitialRender();

  useEffect(() => {
    const getData = async () => {
      const storedData = await storage.getItem("journalData", defaultData);
      setItems(storedData);
    };
    // setItems(defaultData);
    // storage.removeItem("journalData");

    getData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      await storage.setItem("journalData", items);
    };

    if (!isInitialRender) saveData();
  }, [items]);

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

  const addItemToList = (item) => {
    setItems((prevItems) => {
      const todayFood = [...prevItems[days[day]], item];
      const updated = {
        ...prevItems,
        [days[day]]: todayFood,
      };
      return updated;
    });
  };

  return (
    <>
      <View style={container}>
        <View style={dayContainer}>
          <TouchableOpacity>
            <AntDesign name="left" size={22} color={darkGrey} onPress={() => handleDayChange("left")} />
          </TouchableOpacity>
          <Text style={[day]}>{days[day]}</Text>
          <TouchableOpacity>
            <AntDesign name="right" size={22} color={darkGrey} onPress={() => handleDayChange("right")} />
          </TouchableOpacity>
        </View>
        <View style={statsContainer}></View>
      </View>

      <View style={mealRowsContainer}>
        <View style={tableHeadings}>
          <Text style={[foodHeading, tableHeading]}>Food</Text>
          <Text style={[tableHeading]}>Calories</Text>
          <Text style={[tableHeading]}>Protein</Text>
        </View>
        <FlatList
          style={tableData}
          data={items[days[day]] || []}
          renderItem={({ item, index }) => <FoodRow item={item} key={index} />}
          keyExtractor={(item) => item.food}
        />
      </View>
      <ActionButton buttonColor={green} hideShadow={true} onPress={() => setModalVisible(true)} />
      <NewItemModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        addItemToList={addItemToList}
      />
    </>
  );
}
