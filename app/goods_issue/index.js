import React from "react";
import Layout from "@components/Layout";
import Menu from "@components/Menu";
import { router, useLocalSearchParams } from "expo-router";

const GoodsIssue = () => {
  const { token } = useLocalSearchParams()
  return (
    <Layout style={{ gap: 10 }}>
      <Menu onPress={() => router.push({ pathname: "/goods_issue/bppb/", params: { token }})} label={"BPPB"} />
      <Menu
        onPress={() => router.push("./input_material_keluar")}
        label={"Input Material Keluar"}
      />
    </Layout>
  );
};

export default GoodsIssue;
