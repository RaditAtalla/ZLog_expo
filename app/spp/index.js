import React from "react";
import Layout from "@components/Layout";
import Input from "@components/Input";
import FileInput from "@components/FileInput";
import {View, StyleSheet} from "react-native";
import Button from "@components/Button";
import colors from "@constants/colors";
import { router } from "expo-router";

const SPP = () => {
  return (
    <Layout hasBackButton style={{ justifyContent: "space-between" }}>
      <View style={{ flexDirection:"column", gap: 16 }}>
        <Input
          label={"Item material"}
          placeholder={"Item material..."}
          required
        />
        <Input
          label={"Spesifikasi"}
          placeholder={"Spesifikasi..."}
          required
        />
        <Input
          label={"Volume"}
          placeholder={"Volume..."}
          required
        />
        <Input
          label={"Satuan"}
          placeholder={"Satuan..."}
          required
        />
        <FileInput label={"Contoh gambar (opsional)"} />
        <Input
          label={"Lokasi pekerjaan"}
          placeholder={"Lokasi pekerjaan..."}
          required
        />
      </View>

      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", gap: 12 }}
      >
        <Button
          onPress={() => router.push("./preview")}
          color={colors.blue_primary}
          label={"Finish"} style={{flex:1}}
          type={"ghost"}
        />
        <Button color={colors.blue_primary} label={"Next"} style={{flex:1}}/>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({

});
export default SPP;
