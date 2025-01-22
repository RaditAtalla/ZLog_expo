import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import Input from "@components/Input";
import { View, Text } from "react-native";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig.js";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

const InputMaterialKeluar = () => {
  const [userData, setUserData] = useState({});
  const [materialData, setMaterialData] = useState([]);
  const [material, setMaterial] = useState("");
  const [spesifikasi, setSpesifikasi] = useState("");
  const [volume, setVolume] = useState(0);
  const [volumeOut, setVolumeOut] = useState(0);
  const [satuan, setSatuan] = useState("");
  const [goodsIssueData, setGoodsIssueData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");
  const { token } = useLocalSearchParams();

  function handleNext() {
    setError("");
    const volumeToNumber = parseInt(volume);
    const volumeOutToNumber = parseInt(volumeOut);
    if (
      !material ||
      !spesifikasi ||
      volumeToNumber == 0 ||
      volumeOutToNumber == 0 ||
      !satuan
    ) {
      setError("Harap isi seluruh kolom *");
      return;
    }

    if (isNaN(volumeToNumber)) {
      setError("Volume harus angka");
      return;
    }

    if (isNaN(volumeOutToNumber)) {
      setError("Volume out harus angka");
      return;
    }

    const materialDataArr = [];
    materialData.forEach((m) => {
      materialDataArr.push(m.nama);
    });

    if (!materialDataArr.includes(material)) {
      return setError("Material tidak ditemukan");
    }

    setGoodsIssueData((s) => [
      ...s,
      { material, spesifikasi, volume, satuan, volumeOut },
    ]);

    setMaterial("");
    setSpesifikasi("");
    setVolume("");
    setVolumeOut("");
    setSatuan("");
  }

  function handleOk() {
    setError("");
    const volumeToNumber = parseInt(volume);
    const volumeOutToNumber = parseInt(volumeOut);
    if (
      !material ||
      !spesifikasi ||
      volumeToNumber == 0 ||
      volumeOutToNumber == 0 ||
      !satuan
    ) {
      setError("Harap isi seluruh kolom *");
      return;
    }

    if (isNaN(volumeToNumber)) {
      setError("Volume harus angka");
      return;
    }

    if (isNaN(volumeOutToNumber)) {
      setError("Volume out harus angka");
      return;
    }

    const materialDataArr = [];
    materialData.forEach((m) => {
      materialDataArr.push(m.nama);
    });

    if (!materialDataArr.includes(material)) {
      return setError("Material tidak ditemukan");
    }

    setGoodsIssueData((s) => [
      ...s,
      { material, spesifikasi, volume, satuan, volumeOut },
    ]);
    setIsSubmit(true);
  }

  async function handleSubmit() {
    handleNext();
    setError("");
    try {
      const postGoodsIssue = await axios.post(
        "/goods-issue/",
        {
          data: goodsIssueData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const goodsIssueId = postGoodsIssue.data.id;

      router.push({
        pathname: "/goods_issue/preview",
        params: { token, goodsIssueId },
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

    async function getMaterial() {
      try {
        const response = await axios.get("/material", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setMaterialData(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    getUser();
    getMaterial();
  }, []);

  if (userData.jabatan != "LOGISTIK" && userData.jabatan != "PENBAR") {
    return (
      <Layout style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Forbidden access</Text>
      </Layout>
    );
  }

  return (
    <Layout hasBackButton style={{ justifyContent: "space-between" }}>
      <View style={{ flexDirection: "column", gap: 16 }}>
        {error == "Harap isi seluruh kolom *" && (
          <Text style={{ color: "red" }}>{error}</Text>
        )}
        {error == "Material tidak ditemukan" && (
          <Text style={{ color: "red" }}>{error}</Text>
        )}
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
        {error == "Volume harus angka" && (
          <Text style={{ color: "red" }}>{error}</Text>
        )}
        <Input
          label={"Volume"}
          placeholder={"Volume..."}
          inputMode={"numeric"}
          required
          value={volume}
          onChangeText={(text) => setVolume(text)}
        />
        <Input
          label={"Volume Keluar"}
          placeholder={"Volume keluar..."}
          inputMode={"numeric"}
          required
          value={volumeOut}
          onChangeText={(text) => setVolumeOut(text)}
        />
        <Input
          label={"Satuan"}
          placeholder={"Satuan..."}
          required
          value={satuan}
          onChangeText={(text) => setSatuan(text)}
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
            color={"green"}
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
};

export default InputMaterialKeluar;
