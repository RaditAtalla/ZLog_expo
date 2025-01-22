import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig.js";
import { View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import axios from "axios";

const GoodsReceiptPreview = () => {
  const [goodsReceiptDetail, setGoodsReceiptDetail] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, goodsReceiptId } = useLocalSearchParams();

  useEffect(() => {
    async function getGoodsReceipt() {
      try {
        const responseGoodsReceipt = await axios.get(
          `/goods-receipt/${goodsReceiptId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGoodsReceiptDetail(responseGoodsReceipt.data.goodsReceiptDetail);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getGoodsReceipt();
  }, []);

  return (
    <Layout hasBackButton style={{ justifyContent: "space-between" }}>
      <View style={{ gap: 20 }}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          goodsReceiptDetail.map((d) => {
            return (
              <View key={d.id} style={{ marginBottom: 30 }}>
                <Text>Material: {d.material}</Text>
                <Text>spesifikasi: {d.spesifikasi}</Text>
                <Text>volume: {d.volume}</Text>
                <Text>satuan: {d.satuan}</Text>
              </View>
            );
          })
        )}
      </View>
      <Button
        label={"Finish"}
        color={colors.blue_primary}
        onPress={() => router.replace({ pathname: "/home", params: { token } })}
        style={{ alignSelf: "flex-end" }}
      />
    </Layout>
  );
};

export default GoodsReceiptPreview;
