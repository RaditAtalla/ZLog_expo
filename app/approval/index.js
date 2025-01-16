import React, {useEffect, useState} from "react";
import Layout from "@components/Layout";
import { View, Text } from "react-native";
import Button from "@components/Button";
import colors from "@constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import Menu from "@components/Menu";

const ApprovalList = () => {
  const [userData, setUserData] = useState("");
  const [listSpp, setListSpp] = useState([])
  const { token } = useLocalSearchParams();

  async function getUser() {
    try {
      const response = await axios.get("http://10.110.0.603000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSpp() {
    const response = await axios.get("http://10.110.0.60:3000/spp/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = response.data
    setListSpp(data)
  }

  
  useEffect(() => {
    getUser()
    getSpp()
  }, [])

  return (
    <Layout hasBackButton >
      <Text style={{ fontSize: 18, color: colors.blue_primary, fontWeight: "bold", marginTop: 20 }}>SPP waiting for your approval</Text>
      {listSpp.map((spp) => {
        return(
          <View key={spp.id}>
            <Menu onPress={() => router.push({pathname: 'approval/[id]', params: { token, id: spp.id }})} label={spp.kode} />
          </View>
        )
      })}
    </Layout>
  );
};

export default ApprovalList;
