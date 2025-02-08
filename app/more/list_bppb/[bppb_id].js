import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { View, Text } from "react-native";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig";
import { Download } from "react-native-feather";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import changeSlashToDash from "@lib/utils/changeSlashToDash";
import handleDownloadFromAPI from "@lib/utils/handleDownloadFromAPI";

const SPPDownload = () => {
  const [dataBppb, setDataBppb] = useState({});
  const [detailBppb, setDetailBppb] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, bppbId } = useLocalSearchParams();

  useEffect(() => {
    async function getBppb() {
      try {
        const response = await axios.get(`goods-issue/bppb/${bppbId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        const detail = response.data.detailBppb;
        setDataBppb(data);
        setDetailBppb(detail);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getBppb();
  }, []);

  return (
    <Layout style={{ justifyContent: "space-between" }}>
      <View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Text
              style={{
                color: colors.blue_primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Created at: {new Date(dataBppb.createdAt).toLocaleString()}
            </Text>
            {detailBppb.map((d) => {
              return <Text key={d.id}>material: {d.material}</Text>;
            })}
          </>
        )}
      </View>
      <Button
        label={"Download"}
        onPress={() =>
          handleDownloadFromAPI(
            `/goods-issue/bppb/download/${dataBppb.id}`,
            `${changeSlashToDash(dataBppb.kode)}.pdf`,
            token
          )
        }
        icon={<Download color={"white"} />}
        color={colors.blue_primary}
      />
    </Layout>
  );
};

export default SPPDownload;
