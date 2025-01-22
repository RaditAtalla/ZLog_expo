import React from "react";
import Layout from "@components/Layout";
import Logo from "@components/Logo";
import { Text, View, Platform, Alert } from "react-native";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import Menu from "@components/Menu";
import colors from "@constants/colors";
import { router, useLocalSearchParams } from "expo-router";

const ListGoodsIssue = () => {
  const { token } = useLocalSearchParams();

  async function handleDownload() {
    const fileUrl = "http://10.110.0.165:3000/public/goodsIssue.xlsx";
    const fileName = "goodsIssue.xlsx";

    try {
      const result = await FileSystem.downloadAsync(
        fileUrl,
        FileSystem.documentDirectory + fileName
      );

      save(result.uri, fileName, result.headers["Content-Type"]);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function save(uri, fileName, mime) {
    if (Platform.OS === "android") {
      const permission =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permission.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permission.directoryUri,
          fileName,
          mime
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
        Alert.alert("File berhasil didownload");
      } else {
        shareAsync(uri);
      }
    }
  }

  return (
    <Layout>
      <View style={{ gap: 10 }}>
        <Menu
          onPress={() =>
            router.push({
              pathname: "/more/list_bppb/",
              params: { token },
            })
          }
          label={"BPPB"}
        />
        <Menu label={"Download Goods Issue"} onPress={handleDownload} />
      </View>
    </Layout>
  );
};

export default ListGoodsIssue;
