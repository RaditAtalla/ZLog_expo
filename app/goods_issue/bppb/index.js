import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { View } from "react-native";
import Input from "@components/Input";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const BPPBInput = () => {
  const [userData, setUserData] = useState({});
  const [material, setMaterial] = useState();
  const [spesifikasi, setSpesifikasi] = useState();
  const [volume, setVolume] = useState();
  const [satuan, setSatuan] = useState();
  const [lokasi, setLokasi] = useState();
  const [namaPekerja, setNamaPekerja] = useState();
  const [detailBppb, setDetailBppb] = useState([]);
  const [isOk, setIsOk] = useState(false);
  const { token } = useLocalSearchParams();

  function handleNext() {
    setDetailBppb((b) => [
      ...b,
      { material, spesifikasi, volume, satuan, lokasi },
    ]);
    setMaterial("");
    setSpesifikasi("");
    setVolume("");
    setSatuan("");
    setLokasi("");
  }

  function handleOk() {
    setDetailBppb((b) => [
      ...b,
      { material, spesifikasi, volume, satuan, lokasi },
    ]);
    setIsOk(true);
  }

  async function handleSubmit() {
    const kode = "BPPB 05";

    try {
      const postBppb = await axios.post(
        "/goods-issue/bppb",
        {
          kode,
          namaPekerja,
          materialsData: detailBppb,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const bppbId = postBppb.data.id
      console.log(bppbId)

      router.push({ pathname: "/goods_issue/bppb/preview", params: { token, bppbId }});
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

  return (
    <Layout style={{ justifyContent: "space-between" }}>
      <View style={{ gap: 10 }}>
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
          value={volume}
          onChangeText={(text) => setVolume(text)}
          required
        />
        <Input
          label={"Satuan"}
          placeholder={"Satuan..."}
          value={satuan}
          onChangeText={(text) => setSatuan(text)}
          required
        />
        <Input
          label={"Lokasi pekerjaan"}
          placeholder={"Lokasi pekerjaan..."}
          value={lokasi}
          onChangeText={(text) => setLokasi(text)}
          required
        />
        <Input
          label={"Nama pekerja"}
          placeholder={"Nama pekerja..."}
          value={namaPekerja}
          onChangeText={(text) => setNamaPekerja(text)}
          required
        />
      </View>

      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", gap: 5 }}
      >
        <Button
          onPress={handleNext}
          color={colors.blue_primary}
          label={"Next"}
          type={"ghost"}
        />
        {isOk ? (
          <Button onPress={handleSubmit} color={"green"} label={"Submit"} />
        ) : (
          <Button onPress={handleOk} color={colors.blue_primary} label={"Ok"} />
        )}
      </View>
    </Layout>
  );
};

export default BPPBInput;
