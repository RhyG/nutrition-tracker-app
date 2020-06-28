import React, { useState, useEffect } from "react";
import { View, Modal, StyleSheet, Text, TextInput, Button } from "react-native";
import shortid from "shortid";

import globalStyles from "../../config/globalStyles";
const { offWhite } = globalStyles;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "black",
    opacity: 0.5,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  content: {
    minWidth: "65%",
    maxWidth: "65%",
    borderRadius: 4,
    backgroundColor: "#fff",
    padding: 20,
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
    marginBottom: 10,
  },
  inputLabel: {
    textAlign: "left",
    width: "100%",
    marginBottom: 5,
  },
  input: {
    backgroundColor: offWhite,
    width: "100%",
    borderRadius: 4,
    // height: 20,
    paddingLeft: 10,
    paddingVertical: 10,
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

export default function EditItemModal({ visible, closeModal, updateItem, item }) {
  const [editingItem, setEditingItem] = useState(item);

  useEffect(() => setEditingItem(item), [item]);

  const handleChange = (text, name) => {
    setEditingItem((prevState) => ({
      ...prevState,
      [name]: text,
    }));
  };

  const handleClose = () => {
    const newItem = { id: shortid.generate(), ...item };
    updateItem(editingItem);
    // if (checkAllFields(newItem)) addItemToList(newItem);
    closeModal();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} presentationStyle="overFullScreen">
      <View style={styles.overlay} />
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <Text style={styles.heading}>Edit item</Text>
          <Text style={styles.inputLabel}>Food</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, "food")}
            value={editingItem.food}
            style={styles.input}
          />
          <Text style={[styles.inputLabel, { marginTop: 10 }]}>Calories</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, "calories")}
            value={String(editingItem.calories)}
            style={[styles.input, { marginBottom: 10 }]}
          />
          <Text style={styles.inputLabel}>Protein</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, "protein")}
            value={String(editingItem.protein)}
            style={styles.input}
          />
          <Button title="Close" onPress={handleClose}>
            CLOSE
          </Button>
        </View>
      </View>
    </Modal>
  );
}
