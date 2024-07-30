import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import COLORS from "../constants/colors";

const Button = ({ label, onPress, color, type, style, icon }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: type == "ghost" ? "white" : color,
          borderWidth: type == "ghost" ? 1 : 0,
          borderColor: type == "ghost" && COLORS.blue_primary,
        },
        styles.container,
        style,
      ]}
    >
      {icon}
      <Text
        style={[
          styles.label,
          { color: type == "ghost" ? COLORS.blue_primary : "white" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  label: {
    fontSize: 16,
    fontFamily: "InterBold",
  },
});

export default Button;
