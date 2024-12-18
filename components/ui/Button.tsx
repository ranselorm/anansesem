import { Colors } from "@/theme";
import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  GestureResponderEvent,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface ButtonProps {
  text: string;
  subtext?: string;
  onPress?: (e: GestureResponderEvent) => void;
  absolute?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onPress, absolute }) => {
  return (
    <View
      style={[
        styles.buttonWrapper,
        {
          position: absolute ? "absolute" : "relative",
          bottom: absolute ? 20 : 0,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>{text}</Text>
        <FontAwesome6 name="circle-arrow-right" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: "#000",
    borderRadius: 15,
    paddingRight: 2,
    alignSelf: "center",
    // position: "absolute",
    // bottom: 20,
  },
  button: {
    backgroundColor: "#CCFF33",
    borderRadius: 15,
    width: 260,
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    // borderTopWidth: 2,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 30,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default Button;
