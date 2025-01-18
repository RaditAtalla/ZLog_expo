import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import React from "react";
import colors from "@constants/colors";
import Account from "@components/Account";
import { Image } from "react-native";

const _layout = () => {
  const [loaded] = useFonts({
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
    InterBold: require("../assets/fonts/Inter-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: { color: colors.blue_primary, fontSize: 16 },
        headerRight: () => <Account onPress={() => router.dismissAll()} />,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          headerBackVisible: false,
          title: "",
          headerLeft: () => (
            <Image
              source={require("@assets/images/logo-bare.png")}
              style={{ width: 30, height: 30 }}
            />
          ),
        }}
      />
      <Stack.Screen name="more/index" options={{ title: 'More' }} />
      <Stack.Screen name="more/list_spp/index" options={{ title: 'List SPP' }} />
      <Stack.Screen name="more/list_spp/[spp_id]" options={{ title: 'Download SPP' }} />
      <Stack.Screen name="more/list_goods_issue" options={{ title: 'List Goods Issue' }} />
      <Stack.Screen name="more/list_goods_receipt" options={{ title: 'List Goods Receipt' }} />
      <Stack.Screen name="more/stock_material" options={{ title: 'Stock Material' }} />
      <Stack.Screen name="spp/index" options={{ title: 'Input SPP' }} />
      <Stack.Screen name="spp/preview" options={{ title: 'Preview SPP' }} />
      <Stack.Screen name="approval/index" options={{ title: 'Approval List' }} />
      <Stack.Screen name="approval/[id]" options={{ title: 'Approval' }} />
      <Stack.Screen name="goods_receipt/index" options={{ title: 'Goods Receipt' }} />
      <Stack.Screen name="goods_receipt/input" options={{ title: 'Input Goods Receipt' }} />
      <Stack.Screen name="goods_issue/index" options={{ title: 'Goods Issue' }} />
      <Stack.Screen name="goods_issue/bppb/index" options={{ title: 'Input BPPB' }} />
      <Stack.Screen name="goods_issue/bppb/preview" options={{ title: 'Preview BPPB' }} />
      <Stack.Screen name="goods_issue/input_material_keluar" options={{ title: 'Input Material Keluar' }} />
    </Stack>
  );
};

export default _layout;
