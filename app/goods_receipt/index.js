import React from "react";
import Layout from "@components/Layout";
import { View } from "react-native";
import Input from "@components/Input";
import Button from "@components/Button";
import colors from "@constants/colors";
import { router } from "expo-router";

const GoodsReceipt = () => {
  return (
    <Layout
      hasBackButton
      style={{ justifyContent: "space-between" }}
    >
      <View style={{ gap: 10 }}>
        <Input
          label={"Item material"}
          placeholder={"Item material..."}
          required
        />
        <Input
          label={"Item material"}
          placeholder={"Item material..."}
          required
        />
        <Input
          label={"Item material"}
          placeholder={"Item material..."}
          required
        />
        <Input
          label={"Item material"}
          placeholder={"Item material..."}
          required
        />
      </View>

      <Button
        onPress={() => router.push("./input")}
        color={colors.blue_primary}
        label={"Next"}
        style={{ alignSelf: "flex-end" }}
      />
    </Layout>
  );
};

export default GoodsReceipt;
