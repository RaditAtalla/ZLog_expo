import React from "react";
import { Pressable, View } from "react-native";
import { User } from "react-native-feather";
import colors from "@constants/colors";

const Account = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        borderWidth: 1,
        borderColor: colors.blue_primary,
        borderRadius: 100,
        padding: 3,
      }}
    >
      <User color={colors.blue_primary} />
    </Pressable>
  );
};

export default Account;
