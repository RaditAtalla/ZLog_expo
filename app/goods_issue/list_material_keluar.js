import axios from "axios";
import "@constants/axiosConfig.js";
import { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import useUser from "@lib/hooks/useUser";

export default function ListMaterialKelaur() {
  const [detailGoodsIssue, setDetailGoodsIssue] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useLocalSearchParams();
  const userData = useUser(token);

  useEffect(() => {
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
        {detailGoodsIssue.length == 0 && <Text>Tidak ada data</Text>}
      </View>
    </Layout>
  );
}
