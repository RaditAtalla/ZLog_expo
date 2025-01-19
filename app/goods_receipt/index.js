import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import { Text, View } from "react-native";
import Input from "@components/Input";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import CalendarPicker from "react-native-calendar-picker";

const GoodsReceipt = () => {
  const [userData, setUserData] = useState({});
  const [tanggal, setTanggal] = useState(new Date());
  const [noSuratJalan, setNoSuratJalan] = useState();
  const [vendor, setVendor] = useState();
  const [namaPengantar, setNamaPengantar] = useState();
  const { token } = useLocalSearchParams();

  async function handleNext() {
    console.log(typeof tanggal.toISOString())
    router.push({
      pathname: "goods_receipt/input",
      params: { token, tanggal: tanggal.toISOString(), noSuratJalan, vendor, namaPengantar },
    });
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
        <CalendarPicker mode="date" onDateChange={t => setTanggal(t)} />
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
