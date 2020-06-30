import React, { useState, useRef } from "react";
import { View, Modal, StyleSheet, Text, TextInput } from "react-native";
import shortid from "shortid";

import Button from "../../components/Button";
import RadioButton from "../../components/RadioButton";
import globalStyles from "../../config/globalStyles";
const { offWhite, darkGrey, fontLightGrey } = globalStyles;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "black",
    opacity: 0.5,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  content: {
    minWidth: "80%",
    maxWidth: "80%",
    borderRadius: 6,
    backgroundColor: "#fff",
    padding: 30,
    alignItems: "center",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 16,
    textAlign: "left",
    width: "100%",
    marginBottom: 20,
    fontWeight: "bold",
    color: darkGrey,
  },
  inputLabel: {
    textAlign: "left",
    width: "100%",
    marginBottom: 5,
    color: darkGrey,
  },
  input: {
    backgroundColor: offWhite,
    width: "100%",
    borderRadius: 6,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  saveAnother: {
    marginRight: "auto",
    marginVertical: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: "auto",
  },
  cancel: {
    color: fontLightGrey,
    fontSize: 16,
    marginLeft: 20,
  },
});

const defaultItem = {
  food: "",
  calories: "",
  protein: "",
};

const checkAllFields = (fields) => {
  let valid;

  Object.values(fields).forEach((item) => {
    if (item.length > 0) {
      valid = true;
    }
  });

  return valid;
};

export default function NewItemModal({ visible, closeModal, addItemToList }) {
  const [item, setItem] = useState(defaultItem);
  const [addAnotherSelected, setAddAnotherSelected] = useState(false);

  const foodInputRef = useRef();

  const handleChange = (text, name) => {
    setItem((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };

  const handleSave = () => {
    const newItem = { id: shortid.generate(), ...item };

    if (checkAllFields(item)) {
      addItemToList(newItem);
    } else {
      return;
    }

    setItem(defaultItem);
    setAddAnotherSelected(false);
    foodInputRef.current.focus();

    if (!addAnotherSelected) closeModal();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} presentationStyle="overFullScreen">
      <View style={styles.overlay} />
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <Text style={styles.heading}>Add an item</Text>
          <Text style={styles.inputLabel}>Food</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, "food")}
            value={item.food}
            style={styles.input}
            ref={foodInputRef}
          />
          <Text style={[styles.inputLabel, { marginTop: 15 }]}>Calories</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, "calories")}
            value={item.calories}
            style={[styles.input, { marginBottom: 15 }]}
            keyboardType="number-pad"
          />
          <Text style={styles.inputLabel}>Protein</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, "protein")}
            value={item.protein}
            style={styles.input}
            keyboardType="number-pad"
          />
          <View style={styles.saveAnother}>
            <RadioButton
              label="Add another?"
              selected={addAnotherSelected}
              onPress={() => setAddAnotherSelected((prev) => !prev)}
            />
          </View>
          <View style={styles.actionsContainer}>
            <Button title="Close" onPress={handleSave}>
              Save
            </Button>
            <Text
              style={styles.cancel}
              onPress={() => {
                setItem(defaultItem);
                closeModal();
              }}
            >
              Cancel
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
