import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { View, Text } from "react-native";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig";
import { Download } from "react-native-feather";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const SPPDownload = () => {
  const [detailSpp, setDetailSpp] = useState([]);
  const { token, sppId } = useLocalSearchParams();

  useEffect(() => {
    async function getSpp() {
      try {
        const response = await axios.get(`spp/${sppId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.detailSpp;
        setDetailSpp(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    getSpp();
  }, []);

  return (
    <Layout style={{ justifyContent: "space-between" }}>
      <View>
        {detailSpp.map((d) => {
          return <Text key={d.id}>material: {d.material}</Text>;
        })}
      </View>
      <Button
        label={"Download"}
        icon={<Download color={"white"} />}
        color={colors.blue_primary}
      />
    </Layout>
  );
};

export default SPPDownload;
