import React from "react";
import Layout from "@components/Layout";
import Button from "@components/Button";
import colors from "@constants/colors";
import { View } from "react-native";

const SPPPreview = () => {
  return (
    <Layout
      hasBackButton
      style={{ justifyContent: "space-between" }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: "black",
          height: 300,
          width: "100%",
        }}
      />
      <Button
        label={"Submit"}
        color={colors.blue_primary}
        style={{ alignSelf: "flex-end" }}
      />
    </Layout>
  );
};

export default SPPPreview;
