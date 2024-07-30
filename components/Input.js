import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { Eye, EyeOff } from "react-native-feather";

const Input = ({
  required,
  placeholder,
  keyboardType,
  style,
  password,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return password ? (
    <View>
      {label && (
        <Text style={styles.text}>
          {label}
          {required && <Text style={{ color: COLORS.warning }}>*</Text>}:
        </Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={showPassword}
          style={[styles.input, style]}
          placeholderTextColor={COLORS.blue_secondary}
        />
        {password &&
          (showPassword ? (
            <EyeOff
              onPress={handleShowPassword}
              color={COLORS.blue_secondary}
              style={{ position: "relative", zIndex: 5 }}
            />
          ) : (
            <Eye
              onPress={handleShowPassword}
              color={COLORS.blue_secondary}
              style={{ position: "relative", zIndex: 5 }}
            />
          ))}
      </View>
    </View>
  ) : (
    <View>
      {label && (
        <Text style={styles.text}>
          {label}
          {required && <Text style={{ color: COLORS.warning }}>*</Text>}:
        </Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          keyboardType={keyboardType}
          style={[styles.input, style]}
          placeholderTextColor={COLORS.blue_secondary}
        />
        {password &&
          (showPassword ? (
            <EyeOff
              onPress={handleShowPassword}
              color={COLORS.blue_secondary}
              style={{ position: "relative", zIndex: 5 }}
            />
          ) : (
            <Eye
              onPress={handleShowPassword}
              color={COLORS.blue_secondary}
              style={{ position: "relative", zIndex: 5 }}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    backgroundColor: COLORS.blue_opacity,
    borderWidth: 1,
    borderColor: COLORS.light_grey,
    paddingHorizontal: 20,
  },
  input: {
    color: COLORS.blue_primary,
    fontSize: 16,
    paddingVertical: 10,
    paddingRight: 5,
    width: "90%",
  },
  label: {
    fontSize: 14,
    fontFamily: "InterMedium",
  },
});

export default Input;
