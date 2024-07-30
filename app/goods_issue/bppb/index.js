import React from "react";
import Layout from "@components/Layout";
import { View } from "react-native";
import Input from "@components/Input";
import Button from "@components/Button";
import colors from "@constants/colors";
import { router } from "expo-router";

const BPPBInput = () => {
  return (
    <Layout style={{ justifyContent: "space-between" }}>
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
        <Input
          label={"Lokasi pekerjaan"}
          placeholder={"Lokasi pekerjaan..."}
          required
        />
        <Input
          label={"Lokasi pekerjaan"}
          placeholder={"Lokasi pekerjaan..."}
          required
        />
      </View>

      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", gap: 5 }}
      >
        <Button
          onPress={() => router.push("./preview")}
          color={colors.blue_primary}
          label={"Finish"}
          type={"ghost"}
        />
        <Button color={colors.blue_primary} label={"Next"} />
      </View>
    </Layout>
  );
};

export default BPPBInput;
