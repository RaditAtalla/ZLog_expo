import React, { useState, useEffect } from "react";
import Layout from "@components/Layout";
import { View, Text, TextInput, ScrollView } from "react-native";
import Button from "@components/Button";
import colors from "@constants/colors";
import "@constants/axiosConfig.js";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import useUser from "@lib/hooks/useUser";

const InputMaterialKeluar = () => {
  const [stock, setStock] = useState([]);
  const [goodsIssueData, setGoodsIssueData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [outOfStock, setOutOfStock] = useState(false);
  const { token } = useLocalSearchParams();
  const userData = useUser(token);

  async function handleSubmit() {
    setError("");
    setOutOfStock(false);

    if (goodsIssueData.length == 0) {
      return setError("Minimal satu material harus diisi sebelum submit");
    }

    if (outOfStock) {
      return setError("Ada material yang stock-nya tidak mencukupi");
    }

    // TODO: if i pass a text, it will give warning, but when i change it to number and then submit, nothing happened
    let textExist = false;
    const seenMaterial = [];
    const goodsIssue = [];

    goodsIssueData.forEach((d) => {
      if (isNaN(d.volumeOut)) {
        return (textExist = true);
      }

      if (!seenMaterial.includes(d.material)) {
        goodsIssue.push(d);
        seenMaterial.push(d.material);
      }
    });

    if (textExist) {
      return setError("Harap isi dengan angka");
    }

    try {
      const postGoodsIssue = await axios.post(
        "/goods-issue/",
        {
          data: goodsIssue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const goodsIssueId = postGoodsIssue.data.id;

      router.push({
        pathname: "/goods_issue/preview",
        params: { token, goodsIssueId },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleChangeText(material, spesifikasi, volumeOut, satuan, stok) {
    if (volumeOut != "") {
      if (stok < volumeOut) {
        return setOutOfStock(true);
      }

      setGoodsIssueData([
        {
          material,
          spesifikasi,
          volumeOut,
          satuan,
        },
        ...goodsIssueData,
      ]);
    }
  }

  useEffect(() => {
    async function getStock() {
      const stock = await axios.get("/material", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = stock.data;
      setStock(data);
      setIsLoading(false);
    }

    getStock();
  }, []);

  if (userData.jabatan != "LOGISTIK" && userData.jabatan != "PENBAR") {
    return (
      <Layout style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Forbidden access</Text>
      </Layout>
    );
  }

  return (
    <Layout style={{ justifyContent: "space-between" }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ gap: 20, paddingHorizontal: 10 }}
          >
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            {stock.length == 0 && <Text>No data..</Text>}
            {stock.map((s) => {
              return (
                <View
                  key={s.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: colors.blue_primary,
                      }}
                    >
                      {s.nama}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      {s.spesifikasi} ({s.volume})
                    </Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <TextInput
                      placeholder="0"
                      inputMode="numeric"
                      onChangeText={(volume) =>
                        handleChangeText(
                          s.nama,
                          s.spesifikasi,
                          volume,
                          s.satuan,
                          s.volume
                        )
                      }
                      style={{
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: colors.light_grey,
                        backgroundColor: colors.blue_opacity,
                        color: colors.blue_primary,
                        fontSize: 14,
                        textAlign: "center",
                        minWidth: 50,
                        maxWidth: 50,
                        height: 25,
                      }}
                    />
                    <Text style={{ fontSize: 14 }}>{s.satuan}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 12,
            }}
          >
            <Button
              onPress={handleSubmit}
              color={colors.blue_primary}
              label={"Submit"}
              style={{ flex: 1 }}
            />
          </View>
        </>
      )}
    </Layout>
  );
};

export default InputMaterialKeluar;
