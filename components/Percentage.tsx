import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface PercentageProps {
  visible: boolean;
  percentage: number;
}

const PercentageOverlay: React.FC<{ visible: boolean; percentage: number }> = ({
  visible,
  percentage,
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0.7)"
          barStyle="light-content"
        />

        <View style={styles.container}>
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <MaterialIcons name="person" size={50} color="#FFD700" />
          </View>

          {/* Loading Text */}
          <Text style={styles.text}>
            Hang tight, while our magical AI weaves a tale just for you!
          </Text>

          {/* Percentage Bar */}
          <View style={styles.progressBar}>
            <View
              style={[styles.progressBarFill, { width: `${percentage}%` }]}
            />
          </View>
          <Text style={styles.percentageText}>{percentage}% complete</Text>

          {/* Activity Indicator */}
          <ActivityIndicator
            size="large"
            color="#FFD700"
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    </Modal>
  );
};

const Percentage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);

  // Simulate progress
  const startLoading = () => {
    setVisible(true);
    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
        setVisible(false);
      } else {
        progress += 10;
        setPercentage(progress);
      }
    }, 500);
  };

  return (
    <View style={styles.appContainer}>
      <TouchableOpacity style={styles.button} onPress={startLoading}>
        <Text style={styles.buttonText}>Generate Story</Text>
      </TouchableOpacity>

      <PercentageOverlay visible={visible} percentage={percentage} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    marginBottom: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
  progressBar: {
    width: "100%",
    height: 10,
    backgroundColor: "#EEE",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FFD700",
  },
  percentageText: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Percentage;
