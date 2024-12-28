import React from "react";
import { Colors, FontSizes } from "@/theme";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

const Socials = () => {
  return (
    <View style={styles.socialIconsContainer}>
      <Text style={styles.signInText}>Sign In</Text>
      <View style={styles.socialIcons}>
        <TouchableOpacity style={styles.iconWrapper}>
          <FontAwesome name="facebook" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper}>
          <Text>
            <AntDesign name="google" size={40} color="black" />{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper}>
          <FontAwesome name="apple" size={40} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signInText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: FontSizes.small,
    color: "#000",
    marginBottom: 20,
  },

  socialIconsContainer: {
    // position: "absolute",
    // bottom: 30,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  iconWrapper: {
    marginHorizontal: 10,
    backgroundColor: "#C4A1FF",
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Socials;
