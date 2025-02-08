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
  const [dataSpp, setDataSpp] = useState({});
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

        const data = response.data;
        const detail = response.data.detailSpp;
        setDataSpp(data);
        setDetailSpp(detail);
      } catch (error) {
        console.log(error.message);
      }
    }

    getSpp();
  }, []);

  return (
    <Layout style={{ justifyContent: "space-between" }}>
      <View>
        <Text
          style={{
            color: colors.blue_primary,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Created at: {new Date(dataSpp.createdAt).toLocaleString()}
        </Text>
        {detailSpp.map((d) => {
          return <Text key={d.id}>material: {d.material}</Text>;
        })}
      </View>
      <Button
        label={"Download"}
        onPress={() =>
          handleDownloadFromAPI(
            `spp/download/${dataSpp.id}`,
            `${changeSlashToDash(dataSpp.kode)}.pdf`,
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
