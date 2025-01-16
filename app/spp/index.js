import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Input from "@components/Input";
import FileInput from "@components/FileInput";
import { View, StyleSheet, Text } from "react-native";
import Button from "@components/Button";
import colors from "@constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const SPP = () => {
  const [material, setMaterial] = useState();
  const [lokasi, setLokasi] = useState();
  const [spesifikasi, setSpesifikasi] = useState();
  const [volume, setVolume] = useState();
  const [satuan, setSatuan] = useState();
  const [materialData, setMaterialData] = useState([]);
  const [lokasiData, setLokasiData] = useState([]);
  const [spesifikasiData, setSpesifikasiData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [satuanData, setSatuanData] = useState([]);
  const [userData, setUserData] = useState("");

  const { token } = useLocalSearchParams();
  const materialArr = [];

  async function getUser() {
    try {
      const response = await axios.get("http://10.110.2.1:3000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.log("user error");
    }
  }

  function handleNext() {
    setMaterialData((m) => [...m, material]);
    setSpesifikasiData((s) => [...s, spesifikasi]);
    setVolumeData((v) => [...v, volume]);
    setSatuanData((s) => [...s, satuan]);
    setLokasiData((l) => [...l, lokasi]);

    setMaterial("");
    setSpesifikasi("");
    setVolume("");
    setSatuan("");
    setLokasi("");

  }

  async function handleSubmit() {
    handleNext();

    let i = 0;
    while (i < materialData.length) {
      materialArr.push({
        material: materialData[i],
        spesifikasi: spesifikasiData[i],
        volume: volumeData[i],
        satuan: satuanData[i],
        lokasi: lokasiData[i],
      });

      i++;
    }

    const kode = "SPP-PP-02"

    try {
      const postSpp = await axios.post(
        "http://10.110.0.60:3000/spp",
        {
          kode,
          data: materialArr,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sppData = postSpp.data
      router.push({ pathname: "/spp/preview", params: { token, kodeSpp: kode } });
    } catch (error) {
      console.log("post spp error");
    }
  }

  useEffect(() => {
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
          <Button
            onPress={handleSubmit}
            color={colors.blue_primary}
            label={"Submit"}
            style={{ flex: 1 }}
          />
        </View>
      </Layout>
    );
  }
};

export default SPP;
