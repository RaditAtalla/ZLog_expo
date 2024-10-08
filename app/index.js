import React from "react";
import { View } from "react-native";
import Layout from "@components/Layout";
import Button from "@components/Button";
import colors from "@constants/colors";
import Input from "@components/Input";
import Logo from "@components/Logo";
import { router } from "expo-router";
import { useState } from "react";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(){
    console.log(email, password);
    // router.push("./home");
  }

  return (
    <Layout
      statusBarColor={"white"}
      style={{ justifyContent: "space-between", paddingTop: 50 }}
    >
      <View>
        <Logo style={{ alignSelf: "center", marginBottom: 50 }} />

        <View style={{ gap: 10 }}>
          <Input 
            label="Email" 
            placeholder={"Masukkan email anda"} 
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
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
