import React from "react";
import Layout from "@components/Layout";
import { View } from "react-native";
import Menu from "@components/Menu";
import { router, useLocalSearchParams } from "expo-router";
import handleDownloadFromAPI from "@lib/utils/handleDownloadFromAPI";

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
          onPress={() =>
            handleDownloadFromAPI(
              "/goods-issue/download",
              "GoodsIssue.pdf",
              token
            )
          }
        />
      </View>
    </Layout>
  );
};

export default ListGoodsIssue;
