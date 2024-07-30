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
        Welcome,{"\n"}
        <Text style={styles.username}>Rachmad</Text>
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
    fontSize: 20,
    fontFamily: "InterMedium",
    // textAlign: "center",
    marginBottom: 50,
  },

  username: {
    fontFamily: "InterBold",
    color: colors.blue_primary,
    fontSize: 36,
    lineHeight: 40,
  },

  menuContainer: {
    gap: 10,
  },

  menuRow: {
    flexDirection: "row",
    gap: 10,
  },

  menu: {
    minWidth: 160,
    maxWidth: 160,
  },
});

export default Home;
