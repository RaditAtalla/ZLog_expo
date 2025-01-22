import React from "react";
import Layout from "@components/Layout";
import Logo from "@components/Logo";
import { Text, View } from "react-native";
import Menu from "@components/Menu";
import colors from "@constants/colors";
import { router, useLocalSearchParams } from "expo-router";

const ListGoodsIssue = () => {
  const { token } = useLocalSearchParams();
  return (
    <Layout>
      <View style={{ gap: 10 }}>
        <Menu
          onPress={() =>
            router.push({
              pathname: "/more/list_bppb/",
              params: { token },
            })
          }
          label={"BPPB"}
        />
        <Menu label={"Download Goods Issue"} />
      </View>
    </Layout>
  );
};

export default ListGoodsIssue;
