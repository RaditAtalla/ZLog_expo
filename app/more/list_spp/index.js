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

const ListSPP = () => {
  const [userData, setUserData] = useState({});
  const [sppData, setSppData] = useState([]);
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

    getUser();
  }, []);

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
      } catch (error) {
        console.log(error.message);
      }
    }

    getSpp();
  }, [userData]);

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
          {sppData.map((d) => {
            return (
              <Menu
                onPress={() => router.push("/more/001")}
                key={d.id}
                label={d.kode}
                style={{ paddingVertical: 5 }}
              />
            );
          })}
        </View>
      </ScrollView>
      <Button
        color={colors.blue_primary}
        label={"Download"}
        icon={<Download color={"white"} />}
      />
    </Layout>
  );
};

export default ListSPP;
