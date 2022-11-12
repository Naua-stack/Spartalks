import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "../../@types/navigation";

type ProductDetailParams = RouteProp<RootStackParamList, "ProductDetail">;

function ProductDetail() {
  const { params } = useRoute<ProductDetailParams>();

  return (
    <View style={styles.container}>
      <Text>ProductDetail</Text>

      <Text>{params.id}</Text>
      <Text>{params.name}</Text>
      <Text>{params.price}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductDetail;
