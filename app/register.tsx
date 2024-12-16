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
import { router } from "expo-router";

const Register: React.FC = () => {
  const sheetRef = useRef<BottomSheetMethods>(null);

  const handlePress = () => {
    sheetRef.current?.close();
    router.push("/get-started");
  };
  return (
    <View style={styles.screen}>
      <MainLayout title="Register">
        <View style={styles.container}>
          <View>
            <TextInput
              style={[styles.input, styles.emailInput]}
              placeholder="Email"
            />
            <TextInput style={styles.input} placeholder="Phone Number" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Re-type Password"
              secureTextEntry
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1.2}
              onPress={() => sheetRef.current?.open()}
            >
              <Text style={styles.buttonText}>Next</Text>
              <MaterialIcons
                name="arrow-forward"
                size={22}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>

            <Text style={styles.signInText}>
              Already have an account?
              <Text style={styles.signInLink}>Sign in</Text>
            </Text>

            <Text style={{ textAlign: "center", marginTop: 8 }}>Sign in</Text>
            <View style={styles.socialIconsContainer}>
              <TouchableOpacity style={styles.iconWrapper}>
                <FontAwesome name="facebook" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWrapper}>
                <Text>
                  <AntDesign name="google" size={24} color="black" />{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWrapper}>
                <FontAwesome name="apple" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </MainLayout>
      <BottomSheet ref={sheetRef} style={styles.bottomSheet}>
        <Text style={{ textAlign: "center", fontSize: 16, marginBottom: 20 }}>
          Please enter the 6-digit code sent to your phone
        </Text>
        <OtpInput
          numberOfDigits={6}
          focusColor="green"
          autoFocus={false}
          hideStick={false}
          placeholder="******"
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          onFocus={() => console.log("Focused")}
          onBlur={() => console.log("Blurred")}
          onTextChange={(text) => console.log(text)}
          onFilled={(text) => console.log(`OTP is ${text}`)}
          textInputProps={{
            accessibilityLabel: "One-Time Password",
          }}
          theme={{
            containerStyle: styles.otpContainer,
          }}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={1.2}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Submit</Text>
          <MaterialIcons
            name="arrow-forward"
            size={22}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
      </BottomSheet>
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
    backgroundColor: "#FBCB46",
    borderRadius: 50,
    marginBottom: 30,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000",
  },
  emailInput: {
    backgroundColor: "#C4A1FF",
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
    fontSize: 14,
    color: "#555",
  },
  signInLink: {
    color: "#5D1889",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
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

  bottomSheet: {
    padding: 60,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    height: 50,
  },
});

export default Register;
