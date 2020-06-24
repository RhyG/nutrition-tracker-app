import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import ActionButton from "react-native-action-button";
import { AntDesign } from "react-native-vector-icons";
import { getDay } from "date-fns";
import { SwipeListView } from "react-native-swipe-list-view";
import { Entypo, MaterialIcons } from "react-native-vector-icons";

import globalStyles from "../../config/globalStyles";
import useIsInitialRender from "../../hooks/useIsInitialRender";
import storage from "../../lib/async-storage";
import NewItemModal from "./NewItemModal";
import Stat from "./Stat";

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
  headerMenu,
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

const getCurrentCalories = (arr) => arr.reduce((acc, curr) => acc + Number(curr.calories), 0);

const getCurrentProtein = (arr) => arr.reduce((acc, curr) => acc + Number(curr.protein), 0);

const HeaderMenu = ({ onPress }) => (
  <TouchableOpacity style={headerMenu}>
    <Entypo name="dots-three-vertical" size={22} color={globalStyles.darkGrey} onPress={onPress} />
  </TouchableOpacity>
);

const FoodRow = ({ item, openEditModal, closeEditModal, handleOpenItemModal }) => {
  const { food, calories, protein } = item;

  return (
    <TouchableHighlight underlayColor={"#AAA"} onPress={() => handleOpenItemModal(item)}>
      <View style={rowContainer}>
        <Text style={[width50]}>{food}</Text>
        <Text>{calories}</Text>
        <Text>{protein}</Text>
      </View>
    </TouchableHighlight>
  );
};

function FoodJournal({ navigation }) {
  const [day, setDay] = useState(getTodayIndex());
  const [modalVisible, setModalVisible] = useState(false);

  const [currentCalories, setCurrentCalories] = useState(0);
  const [currentProtein, setCurrentProtein] = useState(0);

  const [items, setItems] = useState(defaultData);

  const isInitialRender = useIsInitialRender();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderMenu onPress={() => setModalVisible(true)} />,
    });
  }, [navigation]);

  useEffect(() => {
    const getData = async () => {
      const storedData = await storage.getItem("journalData", defaultData);
      setItems(storedData);
      // setCurrentCalories(getCurrentCalories(storedData[days[day]]));
      // setCurrentProtein(getCurrentProtein(storedData[days[day]]));
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

  const removeItemFromList = (id) => {};

  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <MaterialIcons name="delete" size={22} color="#fff" onPress={() => console.log("deleting")} />
      </View>
    </View>
  );

  const handleOpenItemModal = (item) => {
    console.log(item);
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
        <View style={statsContainer}>
          <Stat name="Calories" max={3000} current={getCurrentCalories(items[days[day]])} />
          <Stat name="Protein" max={180} current={getCurrentProtein(items[days[day]])} />
        </View>
      </View>

      <View style={mealRowsContainer}>
        <View style={tableHeadings}>
          <Text style={[foodHeading, tableHeading]}>Food</Text>
          <Text style={[tableHeading]}>Calories</Text>
          <Text style={[tableHeading]}>Protein</Text>
        </View>
        <SwipeListView
          data={items[days[day]] || []}
          renderItem={({ item, index }) => (
            <FoodRow
              item={item}
              key={index}
              openEditModal={handleOpenItemModal}
              closeEditModal={() => setModalVisible(false)}
              handleOpenItemModal={() => handleOpenItemModal(item)}
            />
          )}
          renderHiddenItem={renderHiddenItem}
          // leftOpenValue={75}
          rightOpenValue={-55}
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

export default FoodJournal;
