import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RibbonBanner = () => {
  return (
    <View style={styles.container}>
      {/* Ribbon Ends */}
      <View style={[styles.ribbonTail, styles.leftTail]} />
      <View style={styles.ribbonBody}>
        <Text style={styles.ribbonText}>Global Rankings</Text>
      </View>
      <View style={[styles.ribbonTail, styles.rightTail]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  ribbonBody: {
    backgroundColor: "#800080",
    paddingVertical: 10,
    paddingHorizontal: 30,
    zIndex: 1,
    elevation: 1,
  },
  ribbonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  ribbonTail: {
    width: 20,
    height: 30,
    backgroundColor: "#6A0DAD",
    position: "relative",
  },
  leftTail: {
    transform: [{ skewX: "-25deg" }],
    marginRight: -10,
  },
  rightTail: {
    transform: [{ skewX: "25deg" }],
    marginLeft: -10,
  },
});

export default RibbonBanner;
