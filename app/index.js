import React from "react";
import { View, Text } from "react-native";
import Layout from "@components/Layout";
import Button from "@components/Button";
import colors from "@constants/colors";
import Input from "@components/Input";
import Logo from "@components/Logo";
import "@constants/axiosConfig.js";
import { router } from "expo-router";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    try {
      const response = await axios.post("/user/login", {
        email,
        password,
      });
      const token = response.data.token;
      router.push({ pathname: "/home", params: { token } });
    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);
    }
  }

  return (
    <Layout
      statusBarColor={"white"}
      style={{ justifyContent: "space-between", paddingTop: 50 }}
    >
      <View>
        <Logo style={{ alignSelf: "center", marginBottom: 50 }} />
        {error == "Harap mengisi email dan password!" && (
          <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        )}
        {error == "Email tidak ditemukan" && (
          <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
        )}
        <View style={{ gap: 10 }}>
          <Input
            label="Email"
            placeholder={"Masukkan email anda"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {error == "Password salah" && (
            <Text style={{ color: "red" }}>{error}</Text>
          )}
          <Input
            label="Password"
            placeholder={"Masukkan kata sandi anda"}
            password
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>

      <Button
        onPress={handleLogin}
        color={colors.blue_primary}
        label={"Login"}
      />
    </Layout>
  );
};

export default Login;
