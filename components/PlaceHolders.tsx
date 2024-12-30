import React from "react";
import { View, StyleSheet } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function Placeholder() {
  return (
    <View style={styles.container}>
      <ShimmerPlaceHolder style={styles.shimmer} />
      <ShimmerPlaceHolder style={styles.shimmer} />
      {/* <ShimmerPlaceHolder style={styles.shimmer} duration={1200} /> */}
      {/* <ShimmerPlaceHolder style={styles.shimmer} />
      <ShimmerPlaceHolder
        style={styles.shimmer}
        duration={5000} // Very slow animation
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    backgroundColor: "#f5f5f5",
    // flexDirection: "row",
  },
  shimmer: {
    height: 30,
    width: "100%",
    borderRadius: 5,
    marginBottom: 10,
  },
  shimmer1: {
    height: 30,
    width: "100%",
    borderRadius: 5,
    // marginBottom: 10,
  },
});
