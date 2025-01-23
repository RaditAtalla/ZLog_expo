import React from "react";
import colors from "@constants/colors";
import { View } from "react-native";
import Menu from "@components/Menu";
import { Archive } from "react-native-feather";
import Layout from "@components/Layout";
import { router, useLocalSearchParams } from "expo-router";

const More = () => {
  const { token } = useLocalSearchParams();

  return (
    <Layout>
      <View style={{ gap: 10 }}>
        <Menu
          onPress={() =>
            router.push({ pathname: "/more/stock_material", params: { token } })
          }
          label={"Stock Material"}
          icon={<Archive color={colors.blue_primary} />}
        />
        <Menu
          onPress={() =>
            router.push({ pathname: "/more/list_spp", params: { token } })
          }
          label={"List SPP"}
          icon={<Archive color={colors.blue_primary} />}
        />
        <Menu
          onPress={() =>
            router.push({
              pathname: "/more/list_goods_receipt",
              params: { token },
            })
          }
          label={"List Goods Receipt"}
          icon={<Archive color={colors.blue_primary} />}
        />
        <Menu
          onPress={() =>
            router.push({
              pathname: "/more/list_goods_issue",
              params: { token },
            })
          }
          label={"List Goods Issue"}
          icon={<Archive color={colors.blue_primary} />}
        />
      </View>
    </Layout>
  );
};

export default More;
