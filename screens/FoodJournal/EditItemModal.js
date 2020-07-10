import React, { useState, useEffect } from "react";
import { View, Modal, StyleSheet, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
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
    marginRight: 20,
  },
  actionsContainer: {
    marginTop: 20,
    flexDirection: "row",
    marginRight: "auto",
    alignItems: "center",
  },
});

const defaultItem = {
  food: "",
  calories: "",
  protein: "",
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
            returnKeyType="next"
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
            returnKeyType="next"
          />
          <View style={styles.actionsContainer}>
            <Button title="Close" onPress={handleClose} containerStyle={styles.button} buttonStyle="green">
              Save
            </Button>
            <Button title="Close" onPress={() => closeModal()} buttonStyle="transparent">
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
