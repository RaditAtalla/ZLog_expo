import React from "react";
import { Pressable, View } from "react-native";
import { LogOut, User } from "react-native-feather";
import colors from "@constants/colors";

const Account = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <LogOut color={colors.blue_primary} />
    </Pressable>
  );
};

export default Account;
