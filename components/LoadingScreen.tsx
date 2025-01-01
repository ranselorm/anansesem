import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing, Image } from "react-native";
import { Colors, FontSizes } from "@/theme"; // Adjust this based on your theme setup

interface LoadingScreenProps {
  progress: number; // Progress value from 0 to 100
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  const [animatedProgress] = useState(new Animated.Value(0));

  // Animate the progress bar
  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500, // Smooth transition
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressWidth = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {/* Animated Icon */}
      <Image
        source={require("@/assets/icons/app-icon.png")}
        style={styles.icon}
      />

      <Text style={styles.title}>
        Hang tight, while our magical AI weaves a tale just for you!
      </Text>

      {/* <View style={styles.progressBarBackground}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      </View> */}

      {/* <Text style={styles.percentageText}>{progress}% complete</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9", // Adjust as per your theme
    padding: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: FontSizes.large || 18,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  progressBarBackground: {
    width: "80%",
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
    overflow: "hidden",
    marginVertical: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: Colors.main || "#4CAF50",
  },
  percentageText: {
    marginTop: 10,
    fontSize: FontSizes.medium || 16,
    color: "#555",
  },
});

export default LoadingScreen;
