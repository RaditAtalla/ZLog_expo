import React from "react";
import Layout from "@components/Layout";
import Logo from "@components/Logo";
import { StyleSheet, Text, View } from "react-native";
import colors from "@constants/colors";
import Menu from "@components/Menu";
import {
  Archive,
  Bookmark,
  Check,
  DollarSign,
  MoreHorizontal,
} from "react-native-feather";
import { router } from "expo-router";

const Home = () => {
  return (
    <Layout statusBarColor={"white"}>
      <Text style={styles.header}>
        Welcome, 
        <Text style={styles.username}> Rachmad</Text>
      </Text>

      <View style={styles.menuContainer}>
        <View style={styles.menuRow}>
          <Menu
            onPress={() => router.push("/spp")}
            label={"SPP"}
            style={styles.menu}
          />
          <Menu
            onPress={() => router.push("/approval")}
            label={"Approval"}
            style={styles.menu}
          />
        </View>
        <View style={styles.menuRow}>
          <Menu
            onPress={() => router.push("/goods_receipt")}
            label={"Goods Receipt"}
            style={styles.menu}
          />
          <Menu
            onPress={() => router.push("/goods_issue")}
            label={"Goods Issue"}
            style={styles.menu}
          />
        </View>
        <Menu onPress={() => router.push("/more")} label={"More"} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    color: colors.blue_secondary,
    fontSize: 18,
    fontFamily: "InterMedium",
    paddingBottom: 32,
  },

  username: {
    fontFamily: "InterBold",
    color: colors.blue_primary,
    fontSize: 18,
    lineHeight: 40,
  },

  menuContainer: {
    flex:1,
    flexDirection:"column",
    alignItems:"stretch",
    gap: 10,
  },

  menuRow: {
    flexDirection: "row",
    alignContent:"stretch",
    gap: 10,
  },

  menu: {
    flex:1,
    justifyContent:"center",
    alignContent:"center",
  },
});

export default Home;
