import { Platform, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import axios from "axios";
import "@constants/axiosConfig";

export default async function handleDownloadFromAPI(endpoint, fileName, token) {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    if (response.status == 200) {
      const blob = await response.data; // Get the file as a blob
      // Convert the blob to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(",")[1]; // Extract Base64 part
        saveToDownload(base64data, fileName); // Pass the Base64 data to the function
      };

      reader.readAsDataURL(blob); // Read the blob as a Base64-encoded data URL
    } else {
      console.error("Failed to download PDF:", response.status);
    }
  } catch (error) {
    console.error("Error fetching PDF:", error);
  }
}

async function saveToDownload(pdfData, fileName) {
  try {
    if (Platform.OS !== "android") {
      const permission =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      // Save file to the Downloads folder using StorageAccessFramework
      await FileSystem.StorageAccessFramework.createFileAsync(
        permission.directoryUri, // Base location
        fileName, // File name
        "application/pdf" // MIME type
      )
        .then(async (uri) => {
          // Write the Base64 data to the file
          await FileSystem.writeAsStringAsync(uri, pdfData, {
            encoding: FileSystem.EncodingType.Base64,
          });
        })
        .catch((e) => console.log(e));
    } else {
      // Define the file path in the app's document directory
      const fileUri = FileSystem.documentDirectory + fileName;

      // Write the Base64 PDF data to the file
      await FileSystem.writeAsStringAsync(fileUri, pdfData, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await Sharing.shareAsync(fileUri);
    }
  } catch (error) {
    console.error("Error saving PDF to Downloads folder:", error);
  }
}
