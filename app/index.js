import React from "react";
import { View } from "react-native";
import Layout from "@components/Layout";
import Button from "@components/Button";
import colors from "@constants/colors";
import Input from "@components/Input";
import Logo from "@components/Logo";
import { router } from "expo-router";

const Login = () => {
  return (
    <Layout
      statusBarColor={"white"}
      style={{ justifyContent: "space-between", paddingTop: 50 }}
    >
      <View>
        <Logo style={{ alignSelf: "center", marginBottom: 50 }} />

        <View style={{ gap: 10 }}>
          <Input placeholder={"Username"} />
          <Input placeholder={"Password"} password />
        </View>
      </View>

      <Button
        onPress={() => router.push("./home")}
        color={colors.blue_primary}
        label={"Login"}
      />
    </Layout>
  );
};

export default Login;
