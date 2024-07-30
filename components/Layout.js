import React from "react";
import { View, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";

const Layout = ({ children, style, hasBackButton, title, number }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={[
          { paddingHorizontal: 15, paddingBottom: 20, flex: 1 },
        ]}
      >
        {(title || number) && (
          <Text
            style={{
              fontSize: 36,
              color: colors.blue_primary,
              fontFamily: "InterBold",
              textAlign: "center",
              marginBottom: 50,
            }}
          >
            {title}
            <Text
              style={{
                fontSize: 20,
                color: colors.grey,
                fontFamily: "InterBold",
              }}
            >
              {number}
            </Text>
          </Text>
        )}
        <View style={[style, { flex: 1 }]}>{children}</View>
      </View>
    </SafeAreaView>
  );
};

export default Layout;
