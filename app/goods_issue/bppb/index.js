import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { View, Text } from "react-native";
import Input from "@components/Input";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import getMonthInRoman from "@lib/utils/getMonthInRoman";
import getCurrentYear from "@lib/utils/getCurrentYear";
import getCurrentNumbering from "@lib/utils/getCurrentNumbering";

const BPPBInput = () => {
  const [userData, setUserData] = useState({});
  const [projectData, setProjectData] = useState({});
  const [material, setMaterial] = useState();
  const [spesifikasi, setSpesifikasi] = useState();
  const [volume, setVolume] = useState();
  const [satuan, setSatuan] = useState();
  const [lokasi, setLokasi] = useState();
  const [namaPekerja, setNamaPekerja] = useState();
  const [detailBppb, setDetailBppb] = useState([]);
  const [isOk, setIsOk] = useState(false);
  const [error, setError] = useState("");
  const { token } = useLocalSearchParams();

  function handleNext() {
    setError("");
    const volumeToNumber = parseInt(volume);
    if (
      !material ||
      !spesifikasi ||
      !volume ||
      !satuan ||
      !lokasi ||
      !namaPekerja
    ) {
      setError("Harap isi seluruh kolom *");
      return;
    }

    if (isNaN(volumeToNumber)) {
      setError("Volume harus angka");
      return;
    }

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
    setError("");
    const volumeToNumber = parseInt(volume);
    if (
      !material ||
      !spesifikasi ||
      !volume ||
      !satuan ||
      !lokasi ||
      !namaPekerja
    ) {
      setError("Harap isi seluruh kolom *");
      return;
    }

    if (isNaN(volumeToNumber)) {
      setError("Volume harus angka");
      return;
    }

    setDetailBppb((b) => [
      ...b,
      { material, spesifikasi, volume, satuan, lokasi },
    ]);
    setIsOk(true);
  }

  async function handleSubmit() {
    setError("");
    const volumeToNumber = parseInt(volume);
    if (
      !material ||
      !spesifikasi ||
      !volume ||
      !satuan ||
      !lokasi ||
      !namaPekerja
    ) {
      setError("Harap isi seluruh kolom *");
      return;
    }

    if (isNaN(volumeToNumber)) {
      setError("Volume harus angka");
      return;
    }

    const numbering = await getCurrentNumbering("goods-issue/bppb", token);
    const projectCode = String(projectData.kode);
    const currentMonthInRoman = getMonthInRoman();
    const currentYear = getCurrentYear();
    const kode = `${numbering}/PP/BPPB/${projectCode}/${currentMonthInRoman}/${currentYear}`;

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

      const bppbId = postBppb.data.id;

      router.push({
        pathname: "/goods_issue/bppb/preview",
        params: { token, bppbId },
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

  useEffect(() => {
    if (userData?.projectId) {
      async function getProject() {
        try {
          const response = await axios.get(`/project/${userData.projectId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = response.data;
          setProjectData(data);
        } catch (error) {}
      }

      getProject();
    }
  }, [userData]);

  return (
    <Layout style={{ justifyContent: "space-between" }}>
      <View style={{ gap: 10 }}>
        {error == "Harap isi seluruh kolom *" && (
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
