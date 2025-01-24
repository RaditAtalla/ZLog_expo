import React from "react";
import Layout from "@components/Layout";
import Menu from "@components/Menu";
import handleDownloadFromPublic from "@lib/utils/handleDownloadFromPublic";
import handleDownloadFromAPI from "../../lib/utils/handleDownloadFromAPI";
import { useLocalSearchParams } from "expo-router";

const ListGoodsReceipt = () => {
  const { token } = useLocalSearchParams();

  return (
    <Layout>
      <Menu
        label={"Download Goods Receipt"}
        onPress={() =>
          handleDownloadFromAPI(
            "/goods-receipt/download",
            "GoodsReceipt.pdf",
            token
          )
        }
      />
    </Layout>
  );
};

export default ListGoodsReceipt;
