import React from "react";
import Layout from "@components/Layout";
import { View } from "react-native";
import Button from "@components/Button";
import colors from "@constants/colors";
import { Download } from "react-native-feather";
import { useLocalSearchParams } from "expo-router";

const SPPDownload = () => {
  return (
    <Layout style={{ justifyContent: "space-between" }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: "black",
          height: 300,
          width: "100%",
        }}
      />
      <Button
        label={"Download"}
        icon={<Download color={"white"} />}
        color={colors.blue_primary}
      />
    </Layout>
  );
};

export default SPPDownload;
