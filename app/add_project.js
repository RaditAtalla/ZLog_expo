import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { Alert, Text, View } from "react-native";
import colors from "@constants/colors";
import "@constants/axiosConfig.js";
import { useLocalSearchParams } from "expo-router";
import Button from "@components/Button";
import Input from "@components/Input";
import axios from "axios";

export default function AddProject() {
  const [projectData, setProjectData] = useState({
    nama: "",
    kode: 0,
    lokasi: "",
    emailAcc1: "",
    emailAcc2: "",
  });
  const [error, setError] = useState("");
  const { token } = useLocalSearchParams();

  async function handleAdd() {
    setError("");
    const kodeToNumber = parseInt(projectData.kode);
    if (
      projectData.nama == "" ||
      kodeToNumber == 0 ||
      projectData.lokasi == "" ||
      projectData.emailAcc1.label == "" ||
      projectData.emailAcc2.label == ""
    ) {
      return setError("Harap isi seluruh kolom *");
    }

    if (isNaN(projectData.kode)) {
      return setError("Kode harus angka");
    }

    try {
      const project = await axios.get("/project", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const prevProjectData = project.data;
      let isKodeDuplicate = false;
      prevProjectData.forEach((p) => {
        if (p.kode == parseInt(projectData.kode)) {
          isKodeDuplicate = true;
          return;
        }
      });

      if (isKodeDuplicate) {
        return setError("Kode sudah ada");
      }

      await axios.post(
        "/project",
        {
          kode: kodeToNumber,
          nama: projectData.nama,
          lokasi: projectData.lokasi,
          emailAcc1: projectData.emailAcc1.label,
          emailAcc2: projectData.emailAcc2.label,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjectData({
        nama: "",
        kode: 0,
        lokasi: "",
        emailAcc1: "",
        emailAcc2: "",
      });

      Alert.alert(`${projectData.nama} berhasil ditambah`);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Layout hasBackButton style={{ justifyContent: "space-between" }}>
      <View style={{ flexDirection: "column", gap: 16 }}>
        {error == "Harap isi seluruh kolom *" && (
          <Text style={{ color: "red" }}>{error}</Text>
        )}
        <Input
          label={"Nama Projek"}
          placeholder={"nama projek..."}
          value={projectData.nama}
          onChangeText={(text) =>
            setProjectData({ ...projectData, nama: text })
          }
          required
        />
        {error == "Kode sudah ada" && (
          <Text style={{ color: "red" }}>{error}</Text>
        )}
        <Input
          label={"Kode Projek"}
          placeholder={"kode projek..."}
          inputMode={"numeric"}
          value={projectData.kode}
          onChangeText={(text) =>
            setProjectData({ ...projectData, kode: text })
          }
          required
        />
        <Input
          label={"Lokasi"}
          placeholder={"lokasi..."}
          value={projectData.lokasi}
          onChangeText={(text) =>
            setProjectData({ ...projectData, lokasi: text })
          }
          required
        />
      </View>

      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", gap: 12 }}
      >
        <Button
          color={colors.blue_primary}
          label={"Add"}
          style={{ flex: 1 }}
          onPress={handleAdd}
        />
      </View>
    </Layout>
  );
}
