import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const Menu = ({ style, label, onPress }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.blue_primary,
    borderRadius: 5,
    backgroundColor: COLORS.blue_primary,
    paddingHorizontal: 25,
    paddingVertical: 25,
    gap: 10,
  },
  label: {
    color: 'white',
    fontFamily: "InterMedium",
    fontSize: 16,
    fontWeight:"700",
    textAlign: 'center',
  },
});

export default Menu;
