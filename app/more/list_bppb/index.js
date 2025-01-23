import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { ScrollView, Text, View } from "react-native";
import Menu from "@components/Menu";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig";
import { Download, Plus } from "react-native-feather";
import { router, useLocalSearchParams } from "expo-router";
import FloatingButton from "@components/FloatingButton";
import axios from "axios";

export default function ListBppb() {
  const [bppbData, setBppbData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useLocalSearchParams();

  useEffect(() => {
    async function getBppb() {
      try {
        const response = await axios.get("/goods-issue/bppb", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setBppbData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getBppb();
  }, []);

  return (
    <Layout>
      <FloatingButton
        onPress={() => router.push({ pathname: "/spp/", params: { token } })}
        style={{ bottom: 70, right: 5 }}
        color={colors.success}
        icon={<Plus color={"white"} />}
      />
      <ScrollView>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "InterMedium",
            color: colors.blue_secondary,
            marginBottom: 10,
          }}
        >
          List BPPB
        </Text>
        <View style={{ gap: 10, marginBottom: 10 }}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            bppbData.map((b) => {
              return (
                <Menu
                  onPress={() =>
                    router.push({
                      pathname: `/more/list_bppb/${b.id}`,
                      params: { token, bppbId: b.id },
                    })
                  }
                  key={b.id}
                  label={b.kode}
                  style={{ paddingVertical: 5 }}
                />
              );
            })
          )}
          {bppbData.length == 0 && <Text>Tidak ada data</Text>}
        </View>
      </ScrollView>
      <Button
        color={colors.blue_primary}
        label={"Download"}
        icon={<Download color={"white"} />}
      />
    </Layout>
  );
}
