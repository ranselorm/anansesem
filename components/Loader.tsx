import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

const Loader = () => {
  return (
    <View style={styles.screen}>
      <Image
        source={require("../assets/icons/ananse-read.png")}
        style={styles.icon}
      />
      <Text style={{ fontSize: 40 }}>Loading screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },

  icon: {
    width: 50,
    height: 50,
  },
});

export default Loader;
