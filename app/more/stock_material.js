import React from "react";
import Layout from "@components/Layout";
import { View } from "react-native";
import Button from "@components/Button";
import colors from "@constants/colors";

const StockMaterial = () => {
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
        label={"Next"}
        color={colors.blue_primary}
        style={{ alignSelf: "flex-end" }}
      />
    </Layout>
  );
};

export default StockMaterial;
