import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig.js";
import { View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import axios from "axios";

const SPPPreview = () => {
  const [detailSpp, setDetailSpp] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, sppId } = useLocalSearchParams();

  useEffect(() => {
    async function getSpp() {
      try {
        const responseDataSpp = await axios.get(`/spp/${sppId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDetailSpp(responseDataSpp.data.detailSpp);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getSpp();
  }, []);

  return (
    <Layout hasBackButton style={{ justifyContent: "space-between" }}>
      <View style={{ gap: 20 }}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          detailSpp.map((d) => {
            return (
              <View key={d.id} style={{ marginBottom: 30 }}>
                <Text>Material: {d.material}</Text>
                <Text>spesifikasi: {d.spesifikasi}</Text>
                <Text>volume: {d.volume}</Text>
                <Text>satuan: {d.satuan}</Text>
                <Text>lokasi: {d.lokasi}</Text>
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

export default SPPPreview;
