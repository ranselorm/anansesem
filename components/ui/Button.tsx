import { Colors } from "@/theme";
import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface ButtonProps {
  text: string;
  subtext?: string;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, subtext }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{text}</Text>
          <FontAwesome6 name="circle-arrow-right" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF3E0", // Matches the background
    marginBottom: 100,
  },
  buttonWrapper: {
    backgroundColor: "#000",
    borderRadius: 15,
    paddingRight: 2,
  },
  button: {
    backgroundColor: "#CCFF33",
    borderRadius: 15,
    width: 280,
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    // borderTopWidth: 2,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000", // Text color
  },
});

export default Button;
