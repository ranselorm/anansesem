import React from "react";
import { Image, StatusBar } from "react-native";
import { View, StyleSheet } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.screen}>
      {/* Hide the status bar */}
      <StatusBar hidden={true} />
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/logo.png")} // Update the path as per your structure
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 170,
    height: 170,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default SplashScreen;
