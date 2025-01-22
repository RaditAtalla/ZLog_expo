import axios from "axios";
import "@constants/axiosConfig.js";
import { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ListMaterialKelaur() {
  const [userData, setUserData] = useState({});
  const [detailGoodsIssue, setDetailGoodsIssue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useLocalSearchParams();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setUserData(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    async function getGoodsIssue() {
      try {
        const response = await axios.get("/goods-issue", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setDetailGoodsIssue(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getUser();
    getGoodsIssue();
  }, []);

  if (userData.jabatan != "LOGISTIK" && userData.jabatan != "PENBAR") {
    return (
      <Layout style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Forbidden access</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          detailGoodsIssue.map((d) => {
            return <Text key={d.id}>material: {d.material}</Text>;
          })
        )}
      </View>
    </Layout>
  );
}
