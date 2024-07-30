import React from "react";
import Layout from "@components/Layout";
import { ScrollView, Text, View } from "react-native";
import Menu from "@components/Menu";
import Button from "@components/Button";
import colors from "@constants/colors";
import { Download, Plus } from "react-native-feather";
import { router } from "expo-router";
import FloatingButton from "@components/FloatingButton";

const ListSPP = () => {
  return (
    <Layout>
      <FloatingButton onPress={() => router.push("spp")} style={{ bottom: 70, right: 5 }} color={colors.success} icon={<Plus color={'white'} />} />
      <ScrollView>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "InterMedium",
            color: colors.blue_secondary,
            marginBottom: 10,
          }}
        >
          Juli 2024
        </Text>
        <View style={{ gap: 10, marginBottom: 10 }}>
          <Menu
            onPress={() => router.push("./001")}
            label={"SPP 001"}
            style={{ paddingVertical: 5 }}
          />
          <Menu label={"SPP 001"} style={{ paddingVertical: 5 }} />
          <Menu label={"SPP 001"} style={{ paddingVertical: 5 }} />
          <Menu label={"SPP 001"} style={{ paddingVertical: 5 }} />
          <Menu label={"SPP 001"} style={{ paddingVertical: 5 }} />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "InterMedium",
            color: colors.blue_secondary,
            marginBottom: 10,
          }}
        >
          Agustus 2024
        </Text>
        <View style={{ gap: 10 }}>
          <Menu label={"SPP 001"} style={{ paddingVertical: 5 }} />
          <Menu label={"SPP 001"} style={{ paddingVertical: 5 }} />
          <Menu label={"SPP 001"} style={{ paddingVertical: 5 }} />
          <Menu label={"SPP 001"} style={{ paddingVertical: 5 }} />
          <Menu label={"SPP 001"} style={{ paddingVertical: 5 }} />
        </View>
      </ScrollView>
      <Button
        color={colors.blue_primary}
        label={"Download"}
        icon={<Download color={"white"} />}
      />
    </Layout>
  );
};

export default ListSPP;
