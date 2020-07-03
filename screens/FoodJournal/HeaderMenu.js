import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "react-native-vector-icons";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

import globalStyles from "../../config/globalStyles";

const styles = StyleSheet.create({
  headerMenu: {
    paddingRight: 20,
  },
  optionsContainer: {
    padding: 10,
    borderRadius: 6,
  },
});

const HeaderMenu = ({ navigation, copyPreviousDay, clearDay, clearJournal }) => (
  <TouchableOpacity style={styles.headerMenu}>
    <Menu>
      <MenuTrigger children={<Entypo name="dots-three-vertical" size={22} color={globalStyles.darkGrey} />} />
      <MenuOptions customStyles={{ optionsContainer: styles.optionsContainer }}>
        <MenuOption onSelect={copyPreviousDay}>
          <Text>Copy previous day</Text>
        </MenuOption>
        <MenuOption onSelect={clearDay}>
          <Text>Clear day</Text>
        </MenuOption>
        <MenuOption onSelect={clearJournal}>
          <Text>Clear week</Text>
        </MenuOption>
        <MenuOption onSelect={() => navigation.navigate("Goals")}>
          <Text>Set goals</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  </TouchableOpacity>
);

export default HeaderMenu;
