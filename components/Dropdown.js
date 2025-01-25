import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown as DropdownList } from "react-native-element-dropdown";
import COLORS from "../constants/colors";

const Dropdown = ({ label, style, data, placeholder, required, ...res }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>
        {label}
        {required && <Text style={{ color: COLORS.warning }}>*</Text>}:
      </Text>
      <DropdownList
        data={data}
        labelField={"label"}
        valueField={"value"}
        placeholder={placeholder}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={[styles.placeholder, { color: "black" }]}
        style={styles.input}
        itemTextStyle={styles.item}
        fontFamily="InterMedium"
        {...res}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },

  text: {
    color: "black",
    fontSize: 12,
    fontFamily: "InterMedium",
  },

  placeholder: {
    fontSize: 12,
    fontFamily: "InterMedium",
    color: COLORS.grey,
  },

  input: {
    backgroundColor: COLORS.blue_opacity,
    borderColor: COLORS.light_grey,
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 12,
    paddingHorizontal: 20,
    color: COLORS.grey,
    minHeight: 40,
    maxHeight: 40,
  },

  item: {
    fontSize: 12,
  },
});

export default Dropdown;
