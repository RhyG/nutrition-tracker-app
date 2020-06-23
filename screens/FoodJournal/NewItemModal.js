import React, { useState } from "react";
import { View, Modal, StyleSheet, Text, TextInput, Button } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "black",
    opacity: 0.5,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  content: {
    minWidth: "70%",
    maxWidth: "70%",
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
    const newItem = item;

    if (checkAllFields(item)) addItemToList(newItem);

    closeModal();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} presentationStyle="overFullScreen">
      <View style={styles.overlay} />
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <TextInput
            onChangeText={(text) => handleChange(text, "food")}
            placeholder="Field"
            value={item.food}
          />
          <TextInput
            onChangeText={(text) => handleChange(text, "calories")}
            placeholder="Field"
            value={item.calories}
          />
          <TextInput
            onChangeText={(text) => handleChange(text, "protein")}
            placeholder="Field"
            value={item.protein}
          />
          <Button title="Close" onPress={handleClose}>
            CLOSE
          </Button>
        </View>
      </View>
    </Modal>
  );
}
