import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { View, Text } from "react-native";
import colors from "@constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import Menu from "@components/Menu";
import "@constants/axiosConfig.js";

const ApprovalList = () => {
  const [listSpp, setListSpp] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useLocalSearchParams();

  useEffect(() => {
    async function getSpp() {
      try {
        const response = await axios.get("/spp/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setListSpp(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getSpp();
  }, []);

  return (
    <Layout hasBackButton>
      <Text
        style={{
          fontSize: 18,
          color: colors.blue_primary,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        SPP waiting for your approval
      </Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        listSpp.map((spp) => {
          return (
            <View key={spp.id}>
              <Menu
                onPress={() =>
                  router.push({
                    pathname: "approval/[id]",
                    params: { token, id: spp.id },
                  })
                }
                label={spp.kode}
              />
            </View>
          );
        })
      )}
    </Layout>
  );
};

export default ApprovalList;
