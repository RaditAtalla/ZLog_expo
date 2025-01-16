import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Button from "@components/Button";
import colors from "@constants/colors";
import { View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import axios from "axios";

const SPPPreview = () => {
  const [userData, setUserData] = useState("");
  const [detailSpp, setDetailSpp] = useState([{}])
  const { token, kodeSpp } = useLocalSearchParams();

  async function getUser() {
    try {
      const response = await axios.get("http://10.110.0.60:3000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.log("user error");
    }
  }

  async function getSpp() {
    try {
      const responseDataSpp = await axios.get(
        "http://10.110.0.60:3000/spp/kode/" + kodeSpp,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDetailSpp(responseDataSpp.data.detailSpp)
    } catch (error) {
      console.log("data spp error");
    }
  }

  useEffect(() => {
    getUser();
    getSpp();
  }, []);

  return (
    <Layout hasBackButton style={{ justifyContent: "space-between" }}>
      {detailSpp.map((d) => {
        return (
          <View key={d.id} style={{ marginBottom: 30 }}>
            <Text>Material: {d.material}</Text>
            <Text>spesifikasi: {d.spesifikasi}</Text>
            <Text>volume: {d.volume}</Text>
            <Text>satuan: {d.satuan}</Text>
            <Text>lokasi: {d.lokasi}</Text>
          </View>
        );
      })}
      <Button
        label={"Finish"}
        color={colors.blue_primary}
        onPress={() => router.push({ pathname: "/home", params: { token } })}
        style={{ alignSelf: "flex-end" }}
      />
    </Layout>
  );
};

export default SPPPreview;
