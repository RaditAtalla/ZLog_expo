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
import useUser from "@lib/hooks/useUser";

const ListSPP = () => {
  const [sppData, setSppData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useLocalSearchParams();
  const userData = useUser(token);

  useEffect(() => {
    async function getSpp() {
      try {
        const response = await axios.get("/spp/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setSppData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getSpp();
  }, [userData]);

  if (
    userData.jabatan != "PM" &&
    userData.jabatan != "SEM" &&
    userData.jabatan != "POP"
  ) {
    return (
      <Layout style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Forbidden access</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <FloatingButton
        onPress={() => router.push("spp")}
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
          List SPP
        </Text>
        <View style={{ gap: 10, marginBottom: 10 }}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            sppData.map((d) => {
              return (
                <Menu
                  onPress={() =>
                    router.push({
                      pathname: `/more/list_spp/${d.id}`,
                      params: { token, sppId: d.id },
                    })
                  }
                  key={d.id}
                  label={d.kode}
                  style={{ paddingVertical: 5 }}
                />
              );
            })
          )}
          {sppData.length == 0 && <Text>Tidak ada data</Text>}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default ListSPP;
