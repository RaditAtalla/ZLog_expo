import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Input from "@components/Input";
import FileInput from "@components/FileInput";
import { View, Text } from "react-native";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig.js";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const SPP = () => {
  const [userData, setUserData] = useState({});
  const [material, setMaterial] = useState();
  const [lokasi, setLokasi] = useState();
  const [spesifikasi, setSpesifikasi] = useState();
  const [volume, setVolume] = useState();
  const [satuan, setSatuan] = useState();
  const [sppMaterialData, setSppMaterialData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const { token } = useLocalSearchParams();

  function handleNext() {
    setSppMaterialData((s) => [
      ...s,
      { material, lokasi, spesifikasi, volume, satuan },
    ]);

    setMaterial("");
    setSpesifikasi("");
    setVolume("");
    setSatuan("");
    setLokasi("");
  }

  function handleOk() {
    setSppMaterialData((s) => [
      ...s,
      { material, lokasi, spesifikasi, volume, satuan },
    ]);
    setIsSubmit(true);
  }

  async function handleSubmit() {
    handleNext();
    const kode = "SPP-PP-06";

    try {
      await axios.post(
        "/spp",
        {
          kode,
          data: sppMaterialData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push({
        pathname: "/spp/preview",
        params: { token, kodeSpp: kode },
      });
    } catch (error) {
      console.log(error.message);
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
        console.log(error.message);
      }
    }

    getUser();
  }, []);

  if (userData.jabatan == "PM" || userData.jabatan == "SEM") {
    return <Text>Forbidden access</Text>;
  } else {
    return (
      <Layout hasBackButton style={{ justifyContent: "space-between" }}>
        <View style={{ flexDirection: "column", gap: 16 }}>
          <Input
            label={"Item material"}
            placeholder={"Item material..."}
            value={material}
            onChangeText={(text) => setMaterial(text)}
            required
          />
          <Input
            label={"Spesifikasi"}
            placeholder={"Spesifikasi..."}
            value={spesifikasi}
            onChangeText={(text) => setSpesifikasi(text)}
            required
          />
          <Input
            label={"Volume"}
            placeholder={"Volume..."}
            required
            value={volume}
            onChangeText={(text) => setVolume(text)}
          />
          <Input
            label={"Satuan"}
            placeholder={"Satuan..."}
            required
            value={satuan}
            onChangeText={(text) => setSatuan(text)}
          />
          {/* <FileInput label={"Contoh gambar (opsional)"} /> */}
          <Input
            label={"Lokasi pekerjaan"}
            placeholder={"Lokasi pekerjaan..."}
            value={lokasi}
            onChangeText={(text) => setLokasi(text)}
            required
          />
        </View>

        <View
          style={{ flexDirection: "row", justifyContent: "flex-end", gap: 12 }}
        >
          <Button
            type={"ghost"}
            color={colors.blue_primary}
            label={"Next"}
            style={{ flex: 1 }}
            onPress={handleNext}
          />
          {isSubmit ? (
            <Button
              onPress={handleSubmit}
              color={colors.blue_primary}
              label={"Submit"}
              style={{ flex: 1 }}
            />
          ) : (
            <Button
              onPress={handleOk}
              color={colors.blue_primary}
              label={"Finish"}
              style={{ flex: 1 }}
            />
          )}
        </View>
      </Layout>
    );
  }
};

export default SPP;
