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
          label={"Tanggal barang masuk"}
          placeholder={"Tanggal barang masuk..."}
          required
        />
        <Input
          label={"Nomor surat jalan"}
          placeholder={"Nomor surat jalan..."}
          required
        />
        <Input
          label={"Nama vendor"}
          placeholder={"Nama vendor..."}
          required
        />
        <Input
          label={"Nama pengantar"}
          placeholder={"Nama pengantar..."}
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
