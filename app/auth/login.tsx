import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MainLayout from "../../shared/MainLayout";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors, FontSizes } from "@/theme";
import Socials from "@/components/Socials";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "@/components/ui/Button";

const Login: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.screen}>
      <MainLayout title="Welcome back">
        <View style={styles.container}>
          <View style={styles.placeholder}>
            <MaterialIcons name="person" size={30} color="#FFBB00" />
          </View>
          <Text style={styles.text}>Login</Text>
          <View>
            <TextInput style={styles.input} placeholder="Email/Phone number" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.checkContainer}
              onPress={() => setIsChecked(!isChecked)}
              activeOpacity={1.2}
            >
              <View style={[styles.checkbox, isChecked && styles.checked]}>
                {isChecked && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
              <Text style={styles.label}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1.2}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <Button text="Login" />
        </View>
      </MainLayout>
      <Socials />
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
    gap: 40,
  },

  placeholder: {
    height: 40,
    width: 40,
    borderRadius: 75,
    backgroundColor: "#FF8D6A",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  text: {
    fontSize: FontSizes.small,
    marginTop: -30,
    textAlign: "center",
  },

  input: {
    backgroundColor: Colors.yellow,
    borderRadius: 50,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: -30,
  },

  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 4,
  },

  checked: {
    backgroundColor: Colors.main,
  },

  label: {
    fontSize: 14,
  },

  forgotPassword: {
    fontSize: 14,
    color: Colors.main,
  },
});

export default Login;
