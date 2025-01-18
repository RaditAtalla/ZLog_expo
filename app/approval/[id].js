import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { View, Text } from "react-native";
import Button from "@components/Button";
import colors from "@constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import Menu from "@components/Menu";

const Approval = () => {
  const [userData, setUserData] = useState("");
  const [dataSpp, setDataSpp] = useState();
  const [detailSpp, setDetailSpp] = useState([]);
  const { token, id } = useLocalSearchParams();

  useEffect(() => {
    async function getSpp() {
      try {
        const responseDataSpp = await axios.get(
          "http://10.110.0.165:3000/spp/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDataSpp(responseDataSpp.data);
      } catch (error) {
        console.log("data spp error");
      }

      try {
        const responseDetailSpp = await axios.get(
          "http://10.110.0.165:3000/spp/detail/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDetailSpp(responseDetailSpp.data);
      } catch (error) {
        console.log("detail spp error");
      }
    }

    async function getUser() {
      try {
        const response = await axios.get("http://10.110.0.165:3000/user", {
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

    getUser();
    getSpp();
  }, []);

  async function handleApprove() {
    try {
      await axios.post(
        "http://10.110.0.165:3000/spp/acc",
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

      router.push({ pathname: "/home", params: { token } });
    } catch (error) {
      console.log("Approve error");
    }
  }

  async function handleNotApprove() {
    try {
      await axios.post(
        "http://10.110.0.165:3000/spp/acc",
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
      router.push({ pathname: "/home", params: { token } });
    } catch (error) {
      console.log("Not Approve error");
    }
  }

  return (
    <Layout
      hasBackButton
      style={{ justifyContent: "space-between", paddingTop: 50 }}
    >
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
