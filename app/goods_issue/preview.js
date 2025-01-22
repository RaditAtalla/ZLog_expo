import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig.js";
import { View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import axios from "axios";

const GoodsIssuePreview = () => {
  const [goodsIssueDetail, setGoodsIssueDetail] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, goodsIssueId } = useLocalSearchParams();

  useEffect(() => {
    async function getGoodsIssue() {
      try {
        const responseGoodsIssue = await axios.get(
          `/goods-issue/${goodsIssueId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGoodsIssueDetail(responseGoodsIssue.data.detailGoodsIssue);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getGoodsIssue();
  }, []);

  return (
    <Layout hasBackButton style={{ justifyContent: "space-between" }}>
      <View style={{ gap: 20 }}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          goodsIssueDetail.map((d) => {
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

export default GoodsIssuePreview;
