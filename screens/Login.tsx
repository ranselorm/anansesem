import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MainLayout from "../shared/MainLayout";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { OtpInput } from "react-native-otp-entry";
import { Colors, FontSizes } from "@/theme";

const Login: React.FC = () => {
  const sheetRef = useRef<BottomSheetMethods>(null);

  return (
    <View style={styles.screen}>
      <MainLayout title="Welcome back">
        <View style={styles.container}>
          <View>
            <TextInput style={styles.input} placeholder="Email/Phone number" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />
          </View>
        </View>
      </MainLayout>
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
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 30,
    justifyContent: "center",
    // backgroundColor: "red",
    // paddingBottom: 40,
    gap: 40,
  },
  input: {
    backgroundColor: Colors.yellow,
    borderRadius: 50,
    marginBottom: 30,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000",
  },

  button: {
    backgroundColor: "#D0EE30",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 40,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    backgroundColor: "#000",
    borderRadius: 50,
    padding: 5,
  },
  signInText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: FontSizes.small,
    color: "#000",
    marginBottom: 20,
  },

  socialIconsContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
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

export default Login;
