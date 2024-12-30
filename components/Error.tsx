import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ErrorProps {
  title?: string;
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ title = "Oups!", message }) => {
  return (
    <View style={styles.screen}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default Error;
