import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES, icons, constants } from "../constants";

export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 2000);
  });

  const handleGetToken = async () => {
    // Get AccessToken from user token
    const dataToken = await AsyncStorage.getItem("AccessToken");
    // If token non-exist => login to get token
    if (!dataToken) {
      navigation.replace("Login");
    } else {
      // If token exist => go to Main Layout
      navigation.replace("MainLayout");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Harvest</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
  },
  text: {
    fontWeight: "800",
    fontSize: 30,
    color: "white",
  },
});
