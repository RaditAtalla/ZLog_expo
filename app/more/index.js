import React from "react";
import colors from "@constants/colors";
import { Text, View } from "react-native";
import Menu from "@components/Menu";
import { Archive } from "react-native-feather";
import Layout from "@components/Layout";
import Logo from "@components/Logo";
import { router } from "expo-router";

const More = () => {
  return (
    <Layout>
      <View style={{ gap: 10 }}>
        <Menu
          onPress={() => router.push("/more/stock_material")}
          label={"Stock Material"}
          icon={<Archive color={colors.blue_primary} />}
        />
        <Menu
          onPress={() => router.push("/more/list_spp")}
          label={"List SPP"}
          icon={<Archive color={colors.blue_primary} />}
        />
        <Menu
          onPress={() => router.push("/more/list_goods_receipt")}
          label={"List Goods Receipt"}
          icon={<Archive color={colors.blue_primary} />}
        />
        <Menu
          onPress={() => router.push("/more/list_goods_issue")}
          label={"List Goods Issue"}
          icon={<Archive color={colors.blue_primary} />}
        />
      </View>
    </Layout>
  );
};

export default More;
