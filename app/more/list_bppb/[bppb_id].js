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
  const [detailBppb, setDetailBppb] = useState([]);
  const { token, bppbId } = useLocalSearchParams();

  useEffect(() => {
    async function getBppb() {
      try {
        const response = await axios.get(`goods-issue/${bppbId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.detailBppb;
        setDetailBppb(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    getBppb();
  }, []);

  return (
    <Layout style={{ justifyContent: "space-between" }}>
      <View>
        {detailBppb.map((d) => {
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
