import React, { useState } from "react";
import Layout from "@components/Layout";
import { Alert, Text, View } from "react-native";
import colors from "@constants/colors";
import "@constants/axiosConfig.js";
import ROLE from "@constants/roles";
import { useLocalSearchParams } from "expo-router";
import Button from "@components/Button";
import Input from "@components/Input";
import Dropdown from "@components/Dropdown";
import axios from "axios";

const AddAccount = () => {
  const [error, setError] = useState("");
  const [accountData, setAccountData] = useState({
    nama: "",
    nomorHp: "",
    email: "",
    password: "",
    konfirmasiPassword: "",
    jabatan: "",
  });
  const { token } = useLocalSearchParams();

  async function handleAdd() {
    if (
      accountData.nama == "" ||
      accountData.nomorHp == "" ||
      accountData.email == "" ||
      accountData.password == "" ||
      accountData.jabatan.label == ""
    ) {
      return setError("Harap isi seluruh kolom *");
    }

    if (accountData.password != accountData.konfirmasiPassword) {
      return setError("Password tidak sama");
    }

    try {
      await axios.post(
        "/user/register",
        {
          nama: accountData.nama,
          nomorHp: accountData.nomorHp,
          email: accountData.email,
          password: accountData.password,
          jabatan: accountData.jabatan.label,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert(`${accountData.nama} berhasil ditambah`);

      setAccountData({
        nama: "",
        nomorHp: "",
        email: "",
        password: "",
        konfirmasiPassword: "",
        jabatan: "",
      });
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
          label={"Nama"}
          placeholder={"Nama..."}
          value={accountData.nama}
          onChangeText={(text) =>
            setAccountData({ ...accountData, nama: text })
          }
          required
        />
        <Input
          label={"Nomor HP"}
          placeholder={"Nomor HP..."}
          inputMode={"numeric"}
          value={accountData.nomorHp}
          onChangeText={(text) =>
            setAccountData({ ...accountData, nomorHp: text })
          }
          required
        />
        <Input
          label={"Email"}
          placeholder={"Email..."}
          required
          value={accountData.email}
          onChangeText={(text) =>
            setAccountData({ ...accountData, email: text })
          }
        />
        <Input
          label={"Password"}
          placeholder={"Password..."}
          password
          required
          value={accountData.password}
          onChangeText={(text) =>
            setAccountData({ ...accountData, password: text })
          }
        />
        {error == "Password tidak sama" && (
          <Text style={{ color: "red" }}>{error}</Text>
        )}
        <Input
          label={"Konfirmasi Password"}
          placeholder={"Konfirmasi Password..."}
          password
          required
          value={accountData.konfirmasiPassword}
          onChangeText={(text) =>
            setAccountData({ ...accountData, konfirmasiPassword: text })
          }
        />
        <Dropdown
          label={"Jabatan"}
          placeholder={"Jabatan..."}
          data={ROLE}
          value={accountData.jabatan}
          onChange={(text) => setAccountData({ ...accountData, jabatan: text })}
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
};

export default AddAccount;
