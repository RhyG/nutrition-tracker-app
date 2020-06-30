import React, { useState, useEffect } from "react";
import { View, Modal, StyleSheet, Text, TextInput } from "react-native";
import shortid from "shortid";

import Button from "../../components/Button";
import globalStyles from "../../config/globalStyles";
import { isInputNumber } from "../../lib/helpers";
const { offWhite, darkGrey } = globalStyles;

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
    fontSize: 18,
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
    fontSize: 16,
  },
  input: {
    backgroundColor: offWhite,
    width: "100%",
    borderRadius: 6,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    marginRight: "auto",
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
    if (name === "calories" || name === "protein") {
      if (!isInputNumber(text)) return;
    }

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
            keyboardType="number-pad"
          />
          <Text style={styles.inputLabel}>Protein</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, "protein")}
            value={String(editingItem.protein)}
            style={styles.input}
            keyboardType="number-pad"
          />
          <Button title="Close" onPress={handleClose} style={styles.button}>
            Save
          </Button>
        </View>
      </View>
    </Modal>
  );
}
