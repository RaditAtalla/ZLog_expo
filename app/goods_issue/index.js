import React from "react";
import Layout from "@components/Layout";
import Menu from "@components/Menu";
import { router } from "expo-router";

const GoodsIssue = () => {
  return (
    <Layout style={{ gap: 10 }}>
      <Menu onPress={() => router.push("./bppb")} label={"BPPB"} />
      <Menu
        onPress={() => router.push("./input_material_keluar")}
        label={"Input Material Keluar"}
      />
    </Layout>
  );
};

export default GoodsIssue;
