import React, { useState } from "react";
import Layout from "@components/Layout";
import { Text, View } from "react-native";
import Input from "@components/Input";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig";
import { router, useLocalSearchParams } from "expo-router";
import CalendarPicker from "react-native-calendar-picker";
import useUser from "@lib/hooks/useUser";

const GoodsReceipt = () => {
  const [tanggal, setTanggal] = useState(new Date());
  const [noSuratJalan, setNoSuratJalan] = useState("");
  const [vendor, setVendor] = useState("");
  const [namaPengantar, setNamaPengantar] = useState("");
  const [error, setError] = useState("");
  const { token } = useLocalSearchParams();
  const userData = useUser(token);

  async function handleNext() {
    setError("");
    if (noSuratJalan == "" || vendor == "" || namaPengantar == "") {
      setError("Harap isi seluruh kolom *");
      return;
    }

    router.push({
      pathname: "goods_receipt/input",
      params: {
        token,
        tanggal: tanggal.toISOString(),
        noSuratJalan,
        vendor,
        namaPengantar,
      },
    });
  }

  if (
    userData.jabatan != "LOGISTIK" &&
    userData.jabatan != "PENBAR" &&
    userData.jabatan != "POP"
  ) {
    return (
      <Layout style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Forbidden access</Text>
      </Layout>
    );
  }

  return (
    <Layout hasBackButton style={{ justifyContent: "space-between" }}>
      <View style={{ gap: 10 }}>
        {error == "Harap isi seluruh kolom *" && (
          <Text style={{ color: "red" }}>{error}</Text>
        )}
        <CalendarPicker mode="date" onDateChange={(t) => setTanggal(t)} />
        <Input
          label={"Nomor surat jalan"}
          placeholder={"Nomor surat jalan..."}
          onChangeText={(text) => setNoSuratJalan(text)}
          required
        />
        <Input
          label={"Nama vendor"}
          placeholder={"Nama vendor..."}
          onChangeText={(text) => setVendor(text)}
          required
        />
        <Input
          label={"Nama pengantar"}
          placeholder={"Nama pengantar..."}
          onChangeText={(text) => setNamaPengantar(text)}
          required
        />
      </View>

      <Button
        onPress={handleNext}
        color={colors.blue_primary}
        label={"Next"}
        style={{ alignSelf: "flex-end" }}
      />
    </Layout>
  );
};

export default GoodsReceipt;
