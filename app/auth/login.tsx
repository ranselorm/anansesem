import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MainLayout from "../../shared/MainLayout";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors, FontSizes } from "@/theme";
import Socials from "@/components/Socials";
import Ionicons from "@expo/vector-icons/Ionicons";

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
          <View>
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
          </View>
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
    // justifyContent: "center",
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
    marginBottom: 30,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000",
  },

  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: -60,
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
    // borderColor: "#ffd33d",
  },
  label: {
    fontSize: 15,
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
});

export default Login;
