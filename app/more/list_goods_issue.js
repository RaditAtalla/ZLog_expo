import React from "react";
import Layout from "@components/Layout";
import Logo from "@components/Logo";
import { Text, View } from "react-native";
import Menu from "@components/Menu";
import colors from "@constants/colors";
import { router } from "expo-router";

const ListGoodsIssue = () => {
  return (
    <Layout>
      <View style={{ gap: 10 }}>
        <Menu
          onPress={() => router.push("goods_issue/bppb/preview")}
          label={"BPPB"}
        />
        <Menu label={"Download Goods Issue"} />
      </View>
    </Layout>
  );
};

export default ListGoodsIssue;
