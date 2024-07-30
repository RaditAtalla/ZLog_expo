import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
// import DocumentPicker from 'react-native-document-picker';
import * as DocumentPicker from "expo-document-picker";
import COLORS from "../constants/colors";

const FileInput = ({ required, label, style }) => {
  const handleClick = () => {
    let result = DocumentPicker.getDocumentAsync({});
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>
        {label}
        {required && <Text style={{ color: COLORS.warning }}>*</Text>}:
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonLabel}>Choose file</Text>
        </Pressable>
        <Text style={styles.fileName}>Choose file...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },

  buttonContainer: {
    borderWidth: 1,
    borderColor: COLORS.light_grey,
    borderRadius: 5,
    backgroundColor: COLORS.blue_opacity,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  
  button: {
    backgroundColor: COLORS.blue_primary,
    borderRadius: 5,
    paddingHorizontal: 35,
    paddingVertical: 10,
  },

  buttonLabel: {
    fontFamily: "InterBold",
    fontSize: 14,
    color: "white",
  },

  fileName: {
    fontSize: 14,
    color: COLORS.blue_secondary,
  },
});

export default FileInput;
