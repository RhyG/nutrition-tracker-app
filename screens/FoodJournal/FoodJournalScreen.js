import React, { useState, useEffect, useLayoutEffect, useContext, useCallback, useRef } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import ActionButton from "react-native-action-button";
import format from "date-fns/format";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, AntDesign } from "react-native-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";

import GoalContext from "../../context/GoalContext";
import JournalContext from "../../context/JournalContext";
import useIsInitialRender from "../../hooks/useIsInitialRender";
import NewItemModal from "./NewItemModal";
import EditItemModal from "./EditItemModal";
import Stat from "./Stat";
import HeaderMenu from "./HeaderMenu";
import { getCurrentCalories, getCurrentProtein } from "../../lib/helpers";

import dummyData from "../../dummyData";

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
  macroHeading,
  rowMacro,
  dividerOuter,
  dividerInner,
  eatSomethingContainer,
  eatSomething,
} = styles;

import GlobalStyles from "../../config/globalStyles";
const { green, darkGrey, offWhite, headerStyle } = GlobalStyles;

const Stack = createStackNavigator();

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const today = format(new Date(), "EEEE");

const FoodRow = ({ item, openEditModal, closeEditModal }) => {
  const { food, calories, protein } = item;

  return (
    <TouchableHighlight underlayColor={"#AAA"} onPress={openEditModal}>
      <View style={rowContainer}>
        <Text style={[width50]}>{food}</Text>
        <Text style={[rowMacro]}>{calories}</Text>
        <Text style={[rowMacro]}>{protein}</Text>
      </View>
    </TouchableHighlight>
  );
};

function FoodJournal({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [day, setDay] = useState(days[days.indexOf(today)]);
  const [editingItem, setEditingItem] = useState();

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
  }, [navigation, day]);

  useEffect(() => {
    if (!isInitialRender) updateJournal(items);
  }, [items]);

  useEffect(() => {
    setItems(journalData);
  }, [journalData]);

  const handleDayChange = useCallback(
    (direction) => {
      switch (direction) {
        case "left":
          if (days.indexOf(day) > 0) {
            setDay(days[days.indexOf(day) - 1]);
            return;
          } else {
            return;
          }
        case "right":
          if (days.indexOf(day) < 6) {
            setDay(days[days.indexOf(day) + 1]);
            return;
          } else {
            return;
          }
      }
    },
    [day]
  );

  const addItemToList = (item) => {
    setItems((prevItems) => {
      const todayFood = [...prevItems[day], item];
      const updated = {
        ...prevItems,
        [day]: todayFood,
      };
      return updated;
    });
  };

  const removeItemFromList = (id) => {
    setItems((prevItems) => {
      const todayFood = prevItems[day].filter((item) => item.id !== id);
      const updated = {
        ...prevItems,
        [day]: todayFood,
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

  const handleOpenEditItemModal = (item) => {
    setEditingItem(item);
    setEditModalVisible(true);
  };

  const updateItem = (updatedItem) => {
    const itemIndex = items[day].findIndex((item) => item.id === updatedItem.id);
    const updatedEntries = items[day].filter((item) => item.id !== updatedItem.id);
    updatedEntries.splice(itemIndex, 0, updatedItem);
    setItems((prevItems) => ({
      ...prevItems,
      [day]: updatedEntries,
    }));
  };

  const clearDay = () => {
    setItems((prevItems) => ({
      ...prevItems,
      [day]: [],
    }));
  };

  return (
    <>
      <View style={container}>
        <View style={dayContainer}>
          <TouchableOpacity>
            <AntDesign name="left" size={22} color={darkGrey} onPress={() => handleDayChange("left")} />
          </TouchableOpacity>
          <Text style={[currentDay]}>{day}</Text>
          <TouchableOpacity>
            <AntDesign name="right" size={22} color={darkGrey} onPress={() => handleDayChange("right")} />
          </TouchableOpacity>
        </View>
        <View style={statsContainer}>
          <Stat name="Calories" max={calories} current={getCurrentCalories(items[day])} />
          <Stat name="Protein" max={protein} current={getCurrentProtein(items[day])} />
        </View>
      </View>

      <View style={mealRowsContainer}>
        {items[day].length > 0 ? (
          <>
            <View style={tableHeadings}>
              <Text style={[foodHeading, tableHeading]}>Food</Text>
              <Text style={[tableHeading, macroHeading]}>Calories</Text>
              <Text style={[tableHeading, macroHeading]}>Protein</Text>
            </View>
            <SwipeListView
              useFlatList={true}
              disableRightSwipe={true}
              closeOnRowOpen={true}
              closeOnRowBeginSwipe={true}
              data={items[day] || []}
              renderItem={({ item, index }) => (
                <FoodRow
                  item={item}
                  key={index}
                  openEditModal={() => handleOpenEditItemModal(item)}
                  closeEditModal={() => setEditModalVisible(false)}
                />
              )}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-55}
            />
          </>
        ) : (
          <View style={eatSomethingContainer}>
            <Text style={eatSomething}>Eat something</Text>
          </View>
        )}
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
      {editingItem && (
        <EditItemModal
          visible={editModalVisible}
          closeModal={() => setEditModalVisible(false)}
          // addItemToList={addItemToList}
          item={editingItem}
          updateItem={updateItem}
        />
      )}
    </>
  );
}

const JournalNavigator = ({ headerOptions, navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Food Journal" component={FoodJournal} options={headerOptions} />
  </Stack.Navigator>
);

export default JournalNavigator;
