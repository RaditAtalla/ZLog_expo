import { Platform, Alert } from "react-native";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";

export default async function handleDownloadFromPublic(fileName) {
  const fileUrl = `http://10.110.0.165:3000/public/${fileName}`;

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
