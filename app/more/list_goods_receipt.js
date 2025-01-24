import React from "react";
import Layout from "@components/Layout";
import Menu from "@components/Menu";
import handleDownloadFromPublic from "@lib/utils/handleDownloadFromPublic";

const ListGoodsReceipt = () => {
  return (
    <Layout>
      <Menu
        label={"Download Goods Receipt"}
        onPress={() => handleDownloadFromPublic("goodsReceipt.xlsx")}
      />
    </Layout>
  );
};

export default ListGoodsReceipt;
