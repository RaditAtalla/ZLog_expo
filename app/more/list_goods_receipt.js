import React from "react";
import Layout from "@components/Layout";
import Menu from "@components/Menu";
import handleDownload from "@lib/utils/handleDownload";

const ListGoodsReceipt = () => {
  return (
    <Layout>
      <Menu
        label={"Download Goods Receipt"}
        onPress={handleDownload("goodsReceipt.xlsx")}
      />
    </Layout>
  );
};

export default ListGoodsReceipt;
