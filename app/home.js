import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import { StyleSheet, Text, View } from "react-native";
import colors from "@constants/colors";
import "@constants/axiosConfig.js";
import Menu from "@components/Menu";
import { router, useLocalSearchParams } from "expo-router";
import useUser from "@lib/hooks/useUser";

const Home = () => {
  const { token } = useLocalSearchParams();
  const userData = useUser(token);

  return (
    <Layout statusBarColor={"white"}>
      {userData.jabatan == "ADMIN" ? (
        <>
          <Text style={styles.username}>Admin Dashboard</Text>
          <View style={styles.menuContainer}>
            <View style={styles.menuRow}>
              <Menu
                onPress={() =>
                  router.push({ pathname: "/add_account", params: { token } })
                }
                label={"Add Account"}
                style={styles.menu}
              />
            </View>
            <View style={styles.menuRow}>
              <Menu
                onPress={() =>
                  router.push({ pathname: "/add_project", params: { token } })
                }
                label={"Add Project"}
                style={styles.menu}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.header}>
            Welcome,
            <Text style={styles.username}>{userData.nama}</Text>
          </Text>

          <View style={styles.menuContainer}>
            <View style={styles.menuRow}>
              <Menu
                onPress={() =>
                  router.push({ pathname: "/spp", params: { token } })
                }
                label={"SPP"}
                style={styles.menu}
              />
              <Menu
                onPress={() =>
                  router.push({ pathname: "/approval/", params: { token } })
                }
                label={"Approval"}
                style={styles.menu}
              />
            </View>
            <View style={styles.menuRow}>
              <Menu
                onPress={() =>
                  router.push({
                    pathname: "/goods_receipt/",
                    params: { token },
                  })
                }
                label={"Goods Receipt"}
                style={styles.menu}
              />
              <Menu
                onPress={() =>
                  router.push({ pathname: "/goods_issue", params: { token } })
                }
                label={"Goods Issue"}
                style={styles.menu}
              />
            </View>
            <Menu
              onPress={() =>
                router.push({ pathname: "/more", params: { token } })
              }
              label={"More"}
            />
          </View>
        </>
      )}
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
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    gap: 10,
  },

  menuRow: {
    flexDirection: "row",
    alignContent: "stretch",
    gap: 10,
  },

  menu: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Home;
