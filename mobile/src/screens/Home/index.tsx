import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getPushNotificationToken } from "../../services/getPushNotificationToken";

function Home() {
  const { navigate } = useNavigation();
  const [token, setToken] = useState<string>("");

  function handleNavigateToPDP() {
    navigate("ProductDetail");
  }

  useEffect(() => {
    const getToken = async () => {
      const token = await getPushNotificationToken();

      if (token) {
        setToken(token);
      }
    };

    getToken();
  }, []);

  async function getToken() {
    const token = await getPushNotificationToken();

    Alert.alert("token", token);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateToPDP}>
        <Text>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={getToken}>
        <Text>Get token</Text>
      </TouchableOpacity>

      <Text>{token}</Text>

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

export default Home;
