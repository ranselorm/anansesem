import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import MainLayout from "../../shared/MainLayout";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, FontSizes } from "@/theme";
import Socials from "@/components/Socials";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "@/components/ui/Button";
import { useLogin } from "@/hooks/useSubmit";
import { saveUserData } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/userSlice";
import { jwtDecode } from "jwt-decode";
import { RootState } from "@/store";
import { router } from "expo-router";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const user = useSelector((state: RootState) => state.user.userResponse);
  const dispatch = useDispatch();

  const { mutate: submitData, isPending } = useLogin();

  const dataToSubmit = {
    email,
    password,
  };

  const handleSubmit = async () => {
    submitData(dataToSubmit, {
      onSuccess: async (responseData) => {
        try {
          const decodedToken: any = jwtDecode(responseData?.data?.id_token);

          const updatedUser = {
            isLoggedIn: true,
            name: `${decodedToken.name}`,
            id: decodedToken.sub,
            email: decodedToken.email,
            picture: decodedToken.picture,
            exp: decodedToken.exp,
          };
          dispatch(setUser(updatedUser));
          await saveUserData(user);
          router.replace("/(tabs)/home");
        } catch (error) {
          console.error("Error saving data:", error);
          Alert.alert("Error", "Failed to save user data locally.");
        }
      },
      onError: (error: any) => {
        Alert.alert("Error", error.message || "Failed to submit data.");
      },
    });
  };

  return (
    <View style={styles.screen}>
      <MainLayout title="Welcome back">
        <View style={styles.container}>
          <View style={styles.placeholder}>
            <MaterialIcons name="person" size={30} color="#FFBB00" />
          </View>
          <Text style={styles.text}>Login</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(val) => setPassword(val)}
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
          <Button
            text={isPending ? "Please wait!" : "Login"}
            onPress={handleSubmit}
            // disabled
          />
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

  disabled: {
    backgroundColor: "red",
  },
});

export default Login;
