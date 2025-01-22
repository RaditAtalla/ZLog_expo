import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { Text, View } from "react-native";
import Button from "@components/Button";
import colors from "@constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const BPPBPreview = () => {
  const [dataBppb, setDataBppb] = useState({});
  const [detailBppb, setDetailBppb] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, bppbId } = useLocalSearchParams();

  useEffect(() => {
    async function getBppb() {
      try {
        const response = await axios.get(`/goods-issue/${bppbId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const bppb = response.data;
        const detail = response.data.detailBppb;
        setDataBppb(bppb);
        setDetailBppb(detail);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getBppb();
  }, []);

  return (
    <Layout style={{ justifyContent: "space-between" }}>
      <View>
        {isLoading ? (
          <Text>loading..</Text>
        ) : (
          detailBppb.map((d) => {
            return (
              <View key={d.id} style={{ marginBottom: 10 }}>
                <Text>Material: {d.material}</Text>
                <Text>spesifikasi: {d.spesifikasi}</Text>
                <Text>volume: {d.volume}</Text>
                <Text>satuan: {d.satuan}</Text>
                <Text>lokasi: {d.lokasi}</Text>
              </View>
            );
          })
        )}
        <Text></Text>
      </View>
      <Button
        label={"Finish"}
        onPress={() => router.replace({ pathname: "/home", params: { token } })}
        color={colors.blue_primary}
        style={{ alignSelf: "flex-end" }}
      />
    </Layout>
  );
};

export default BPPBPreview;
