import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { View, Text } from "react-native";
import Button from "@components/Button";
import "@constants/axiosConfig.js";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const Approval = () => {
  const [dataSpp, setDataSpp] = useState();
  const [detailSpp, setDetailSpp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, id } = useLocalSearchParams();

  useEffect(() => {
    async function getSpp() {
      try {
        const responseDataSpp = await axios.get("/spp/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDataSpp(responseDataSpp.data);
        setDetailSpp(responseDataSpp.data.detailSpp);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getSpp();
  }, []);

  async function handleApprove() {
    try {
      await axios.post(
        "/spp/acc",
        {
          approvalStatus: "APPROVED",
          dataSppId: dataSpp.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.replace({ pathname: "/home", params: { token } });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleNotApprove() {
    try {
      await axios.post(
        "/spp/acc",
        {
          approvalStatus: "NOT_APPROVED",
          dataSppId: dataSpp.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.replace({ pathname: "/home", params: { token } });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Layout
      hasBackButton
      style={{ justifyContent: "space-between", paddingTop: 50 }}
    >
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
      <View>
        <Button label={"Approve"} color={"green"} onPress={handleApprove} />
        <Button
          label={"Not Approve"}
          color={"red"}
          onPress={handleNotApprove}
        />
      </View>
    </Layout>
  );
};

export default Approval;
