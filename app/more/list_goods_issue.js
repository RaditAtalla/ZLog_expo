import React from "react";
import Layout from "@components/Layout";
import { View } from "react-native";
import Menu from "@components/Menu";
import { router, useLocalSearchParams } from "expo-router";
import handleDownload from "@lib/utils/handleDownload";

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
        <Menu
          label={"Download Goods Issue"}
          onPress={() => handleDownload("goodsIssue.xlsx")}
        />
      </View>
    </Layout>
  );
};

export default ListGoodsIssue;
