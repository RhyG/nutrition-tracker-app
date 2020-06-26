import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import ActionButton from "react-native-action-button";
import { getDay } from "date-fns";
import { SwipeListView } from "react-native-swipe-list-view";
import { Entypo, MaterialIcons, AntDesign } from "react-native-vector-icons";
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from "react-native-popup-menu";
import { createStackNavigator } from "@react-navigation/stack";

import GoalContext from "../../context/GoalContext";
import JournalContext from "../../context/JournalContext";
import globalStyles from "../../config/globalStyles";
import useIsInitialRender from "../../hooks/useIsInitialRender";
import storage from "../../lib/async-storage";
import NewItemModal from "./NewItemModal";
import Stat from "./Stat";
import { getCurrentCalories, getCurrentProtein } from "../../lib/helpers";

import styles, { width50 } from "./styles";
const {
  container,
  dayContainer,
  currentDay,
  statsContainer,
  mealRowsContainer,
  tableHeadings,
  tableHeading,
  foodHeading,
  tableData,
  rowContainer,
  newItemModal,
  headerMenu,
  macroHeading,
  rowMacro,
  dividerOuter,
  dividerInner,
} = styles;

import GlobalStyles from "../../config/globalStyles";
const { green, darkGrey, offWhite, headerStyle } = GlobalStyles;

const Stack = createStackNavigator();

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const getTodayIndex = () => getDay(new Date()) - 1;

const HeaderMenu = ({ navigation, onPress, clearDay, clearJournal }) => (
  <TouchableOpacity style={headerMenu}>
    <Menu>
      <MenuTrigger children={<Entypo name="dots-three-vertical" size={22} color={globalStyles.darkGrey} />} />
      <MenuOptions>
        <MenuOption onSelect={() => navigation.navigate("Goals")}>
          <Text>Set goals</Text>
        </MenuOption>
        <MenuOption onSelect={clearDay}>
          <Text>Clear day</Text>
        </MenuOption>
        <MenuOption onSelect={clearJournal}>
          <Text>Clear week</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  </TouchableOpacity>
);

const FoodRow = ({ item, openEditModal, closeEditModal, handleOpenItemModal }) => {
  const { food, calories, protein } = item;

  return (
    <>
      <View style={dividerOuter}>
        <View style={dividerInner} />
      </View>
      <TouchableHighlight underlayColor={"#AAA"} onPress={() => handleOpenItemModal(item)}>
        <View style={rowContainer}>
          <Text style={[width50]}>{food}</Text>
          <Text style={[rowMacro]}>{calories}</Text>
          <Text style={[rowMacro]}>{protein}</Text>
        </View>
      </TouchableHighlight>
    </>
  );
};

function FoodJournal({ navigation }) {
  const [day, setDay] = useState(getTodayIndex());
  const [modalVisible, setModalVisible] = useState(false);

  const isInitialRender = useIsInitialRender();

  const {
    goals: { calories, protein },
  } = useContext(GoalContext);

  const { journalData, clearJournal, updateJournal } = useContext(JournalContext);

  const [items, setItems] = useState(journalData);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        ...headerStyle,
        backgroundColor: offWhite,
      },
      headerRight: () => (
        <HeaderMenu
          onPress={() => setModalVisible(true)}
          navigation={navigation}
          clearDay={clearDay}
          clearJournal={clearJournal}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!isInitialRender) updateJournal(items);
  }, [items]);

  useEffect(() => {
    setItems(journalData);
  }, [journalData]);

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

  const removeItemFromList = (id) => {
    setItems((prevItems) => {
      const todayFood = prevItems[days[day]].filter((item) => item.id !== id);
      const updated = {
        ...prevItems,
        [days[day]]: todayFood,
      };
      return updated;
    });
  };

  const renderHiddenItem = ({ item }) => {
    return (
      <TouchableHighlight style={styles.rowBack} onPress={() => removeItemFromList(item.id)}>
        <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <MaterialIcons name="delete" size={22} color="#fff" />
        </View>
      </TouchableHighlight>
    );
  };

  const handleOpenItemModal = (item) => {
    console.log(item);
  };

  const clearDay = () => {
    setItems((prevItems) => ({
      ...prevItems,
      [days[day]]: [],
    }));
  };

  return (
    <>
      <View style={container}>
        <View style={dayContainer}>
          <TouchableOpacity>
            <AntDesign name="left" size={22} color={darkGrey} onPress={() => handleDayChange("left")} />
          </TouchableOpacity>
          <Text style={[currentDay]}>{days[day]}</Text>
          <TouchableOpacity>
            <AntDesign name="right" size={22} color={darkGrey} onPress={() => handleDayChange("right")} />
          </TouchableOpacity>
        </View>
        <View style={statsContainer}>
          <Stat name="Calories" max={calories} current={getCurrentCalories(items[days[day]])} />
          <Stat name="Protein" max={protein} current={getCurrentProtein(items[days[day]])} />
        </View>
      </View>

      <View style={mealRowsContainer}>
        <View style={tableHeadings}>
          <Text style={[foodHeading, tableHeading]}>Food</Text>
          <Text style={[tableHeading, macroHeading]}>Calories</Text>
          <Text style={[tableHeading, macroHeading]}>Protein</Text>
        </View>
        <SwipeListView
          useFlatList={true}
          closeOnRowOpen={true}
          closeOnRowBeginSwipe={true}
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
          rightOpenValue={-55}
        />
      </View>
      <ActionButton
        buttonColor={green}
        hideShadow={true}
        onPress={() => setModalVisible(true)}
        renderIcon={() => <AntDesign name="plus" size={28} color="#fff" />}
      />
      <NewItemModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        addItemToList={addItemToList}
      />
    </>
  );
}

const JournalNavigator = ({ headerOptions, navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Conversions" component={FoodJournal} options={headerOptions} />
  </Stack.Navigator>
);

export default JournalNavigator;
