import { View, StyleSheet, ImageBackground, Image } from "react-native";
import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
  
    useFocusEffect(
      useCallback(() => {
      setTimeout(() => navigation.replace('details'), 2500)
    }, [isFocused])
    )
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/bgImg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    marginRight: "auto",
    marginLeft: "auto",
    height: 70,
    width: 70,
  },
});
