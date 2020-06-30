import React, { useState } from "react";
import { View, Modal, StyleSheet, Text, TextInput } from "react-native";
import shortid from "shortid";

import Button from "../../components/Button";
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
    // height: 20,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  cancel: {
    color: fontLightGrey,
    fontSize: 16,
  },
  saveAnother: {
    width: "40%",
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

  const handleChange = (text, name) => {
    setItem((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };

  const handleClose = () => {
    const newItem = { id: shortid.generate(), ...item };

    if (checkAllFields(item)) {
      addItemToList(newItem);
    } else {
      return;
    }

    setItem(defaultItem);
    closeModal();
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
          <View style={styles.actionsContainer}>
            <Text style={styles.saveAnother}>Add another</Text>
            <Button title="Close" onPress={handleClose}>
              Save
            </Button>
            <Text style={styles.cancel} onPress={closeModal}>
              Cancel
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
