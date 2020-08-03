import React, { useState, useEffect, useLayoutEffect, useContext, useCallback, useRef } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, SafeAreaView, Dimensions } from "react-native";
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
import Button from "../../components/Button";

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
  rowData,
  rowBack,
  dividerOuter,
  dividerInner,
  eatSomethingContainer,
  eatSomething,
  addItemButtonContainer,
} = styles;

import GlobalStyles from "../../config/globalStyles";
const { green, darkGrey, offWhite, headerStyle, mbottom10 } = GlobalStyles;

const Stack = createStackNavigator();

const { height: screenHeight } = Dimensions.get("window");

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const today = format(new Date(), "EEEE");

const FoodRow = ({ item, openEditModal, closeEditModal }) => {
  const { food, calories, protein } = item;

  return (
    <TouchableHighlight underlayColor={"#AAA"} onPress={openEditModal}>
      <View style={rowContainer}>
        <Text style={[rowData, width50]}>{food}</Text>
        <Text style={[rowData, rowMacro]}>{calories}</Text>
        <Text style={[rowData, rowMacro]}>{protein}</Text>
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
          copyPreviousDay={copyPreviousDay}
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
      <TouchableHighlight style={rowBack} onPress={() => removeItemFromList(item.id)}>
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
    // Get the current index of the item
    const itemIndex = items[day].findIndex((item) => item.id === updatedItem.id);
    // Remove the item and insert the updated item at that index
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

  const copyPreviousDay = () => {
    setItems((prevItems) => {
      const yesterday = days[days.indexOf(day) - 1];
      const newItems = [...prevItems[yesterday]];

      return {
        ...prevItems,
        [day]: newItems,
      };
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={container}>
        <View style={dayContainer}>
          <TouchableOpacity onPress={() => handleDayChange("left")}>
            <AntDesign name="left" size={26} color={day === "Monday" ? offWhite : darkGrey} />
          </TouchableOpacity>
          <Text style={[currentDay]}>{day === today ? "Today" : day}</Text>
          <TouchableOpacity onPress={() => handleDayChange("right")}>
            <AntDesign name="right" size={26} color={day === "Sunday" ? offWhite : darkGrey} />
          </TouchableOpacity>
        </View>
        <View style={statsContainer}>
          <Stat name="Calories" max={calories} current={getCurrentCalories(items[day])} style={[mbottom10]} />
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
              scrollEnabled={true}
              disableRightSwipe={true}
              closeOnRowOpen={true}
              closeOnRowBeginSwipe={true}
              keyExtractor={(item, index) => item.id}
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
      <View style={addItemButtonContainer}>
        <Button
          title="Add item"
          buttonStyle="green"
          onPress={() => setModalVisible(true)}
          style={{ height: 45, marginBottom: screenHeight < 670 ? 20 : 0 }}
          labelStyle={{ fontSize: 18 }}
        >
          Add item
        </Button>
      </View>
      {/* <ActionButton
        buttonColor={green}
        hideShadow={true}
        onPress={() => setModalVisible(true)}
        renderIcon={() => <AntDesign name="plus" size={28} color="#fff" />}
      /> */}
      <NewItemModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        addItemToList={addItemToList}
      />
      {editingItem && (
        <EditItemModal
          visible={editModalVisible}
          closeModal={() => setEditModalVisible(false)}
          item={editingItem}
          updateItem={updateItem}
        />
      )}
    </SafeAreaView>
  );
}

const JournalNavigator = ({ headerOptions, navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Food Journal" component={FoodJournal} options={headerOptions} />
  </Stack.Navigator>
);

export default JournalNavigator;
