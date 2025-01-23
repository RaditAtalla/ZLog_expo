import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const StockMaterial = () => {
  const [materialData, setMaterialData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useLocalSearchParams();

  useEffect(() => {
    async function getMaterial() {
      try {
        const response = await axios.get("/material", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setMaterialData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getMaterial();
  }, []);

  return (
    <Layout>
      <View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          materialData.map((m) => {
            return <Text key={m.id}>Material: {m.nama}</Text>;
          })
        )}
        {materialData.length == 0 && <Text>Tidak ada data</Text>}
      </View>
    </Layout>
  );
};

export default StockMaterial;
