import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { View, Text } from "react-native";
import Input from "@components/Input";
import Button from "@components/Button";
import colors from "@constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const GoodsReceiptInput = () => {
  const [userData, setUserData] = useState({});
  const [material, setMaterial] = useState();
  const [spesifikasi, setSpesifikasi] = useState();
  const [volume, setVolume] = useState();
  const [satuan, setSatuan] = useState();
  const [materialData, setMaterialData] = useState([]);
  const [isOk, setIsOk] = useState(false);
  const { token, tanggal, noSuratJalan, vendor, namaPengantar } =
    useLocalSearchParams();

  function handleNext() {
    setMaterialData((s) => [...s, { material, spesifikasi, volume, satuan }]);

    setMaterial("");
    setSpesifikasi("");
    setVolume("");
    setSatuan("");
  }

  function handleOk() {
    setMaterialData((s) => [...s, { material, spesifikasi, volume, satuan }]);
    setIsOk(true);
  }

  async function handleSubmit() {
    const noMaterialMasuk = 2001;

    try {
      await axios.post(
        "/goods-receipt",
        {
          noMaterialMasuk,
          noSuratJalan,
          tanggalMasuk: tanggal,
          vendor,
          namaPengantar,
          data: materialData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.replace({
        pathname: "/home",
        params: { token },
      });
    } catch (error) {
      console.log(error.message)
    }
  }

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
        console.log(error);
      }
    }

    getUser();
  }, []);

  if (
    userData.jabatan != "LOGISTIK" &&
    userData.jabatan != "PENBAR" &&
    userData.jabatan != "POP"
  ) {
    return <Text>Forbidden Access</Text>;
  }

  return (
    <Layout hasBackButton style={{ justifyContent: "space-between" }}>
      <View style={{ gap: 10 }}>
        <Input
          label={"Item material"}
          placeholder={"Item material..."}
          onChangeText={(text) => setMaterial(text)}
          value={material}
          required
        />
        <Input
          label={"Spesifikasi"}
          placeholder={"Spesifikasi..."}
          onChangeText={(text) => setSpesifikasi(text)}
          value={spesifikasi}
          required
        />
        <Input
          label={"Volume"}
          placeholder={"Volume..."}
          onChangeText={(text) => setVolume(text)}
          value={volume}
          required
        />
        <Input
          label={"Satuan"}
          placeholder={"Satuan..."}
          onChangeText={(text) => setSatuan(text)}
          value={satuan}
          required
        />
      </View>

      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", gap: 5 }}
      >
        <Button
          color={colors.blue_primary}
          label={"Next"}
          type={"ghost"}
          onPress={handleNext}
        />
        {isOk ? (
          <Button color={"green"} label={"Finish"} onPress={handleSubmit} />
        ) : (
          <Button color={colors.blue_primary} label={"Ok"} onPress={handleOk} />
        )}
      </View>
    </Layout>
  );
};

export default GoodsReceiptInput;
