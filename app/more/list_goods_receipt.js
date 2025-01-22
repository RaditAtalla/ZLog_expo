import React from "react";
import Layout from "@components/Layout";
import Menu from "@components/Menu";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { Platform, Alert } from "react-native";

const ListGoodsReceipt = () => {
  async function handleDownload() {
    const fileUrl = "http://10.110.0.165:3000/public/goodsReceipt.xlsx";
    const fileName = "goodsReceipt.xlsx";

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
      <Menu label={"Download Goods Receipt"} onPress={handleDownload} />
    </Layout>
  );
};

export default ListGoodsReceipt;
