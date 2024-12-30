import React, { useEffect, useState } from "react";
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
import {
  saveUserData,
  saveLoginValues,
  getLoginValues,
  getUserData,
} from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/userSlice";
import { jwtDecode } from "jwt-decode";
import { router } from "expo-router";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const { mutate: submitData, isPending } = useLogin();

  const updateUserSession = async (responseData: any) => {
    try {
      const decodedToken: any = jwtDecode(responseData?.data?.id_token);
      const updatedUser = {
        isLoggedIn: true,
        name: `${decodedToken.name}`,
        id: decodedToken.sub,
        email: decodedToken.email,
        picture: decodedToken.picture,
        exp: decodedToken.exp,
        token: responseData?.data?.access_token,
      };
      dispatch(setUser(updatedUser));
      await saveUserData(updatedUser);
    } catch (error) {
      console.error("Error updating session:", error);
      Alert.alert("Error", "Failed to update user session.");
    }
  };

  const checkTokenAndReauthenticate = async () => {
    try {
      const userData = await getUserData();
      const loginValues = await getLoginValues();
      const currentTime = Math.floor(Date.now() / 1000);

      if (userData?.exp <= currentTime && loginValues) {
        // Token expired, perform silent re-login
        await silentReLogin(loginValues.email, loginValues.password);
      } else if (userData?.exp > currentTime) {
        dispatch(setUser(userData));
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      console.error("Error during token check:", error);
    }
  };

  const silentReLogin = async (email: string, password: string) => {
    submitData(
      { email, password },
      {
        onSuccess: async (responseData) => {
          await updateUserSession(responseData);
        },
        onError: (error: any) => {
          console.error("Silent re-login failed:", error.message);
        },
      }
    );
  };

  // const silentReLogin = (email: string, password: string) => {
  //   submitData(
  //     { email, password },
  //     {
  //       onSuccess: async (responseData) => {
  //         const decodedToken: any = jwtDecode(responseData?.data?.id_token);
  //         const updatedUser = {
  //           isLoggedIn: true,
  //           name: `${decodedToken.name}`,
  //           id: decodedToken.sub,
  //           email: decodedToken.email,
  //           picture: decodedToken.picture,
  //           exp: decodedToken.exp,
  //           token: responseData?.data?.access_token,
  //         };

  //         dispatch(setUser(updatedUser));
  //         await saveUserData(updatedUser);
  //         console.log("Updated Redux User:", updatedUser);
  //         router.replace("/(tabs)/home");
  //       },
  //       onError: (error: any) => {
  //         console.error("Silent re-login failed:", error.message);
  //       },
  //     }
  //   );
  // };

  const dataToSubmit = {
    email: "gbedzrah1@gmail.com",
    password: "p@ssw0rd123",
  };

  const handleSubmit = async () => {
    // if (!email || !password) {
    //   Alert.alert("Validation Error", "Please enter both email and password.");
    //   return;
    // }
    submitData(
      // { email, password },
      dataToSubmit,
      {
        onSuccess: async (responseData) => {
          await updateUserSession(responseData);
          if (isChecked) {
            await saveLoginValues({ email, password });
          }
          router.replace("/(tabs)/home");
        },
        onError: (error: any) => {
          Alert.alert("Error", error.message || "Failed to login.");
        },
      }
    );
  };

  useEffect(() => {
    checkTokenAndReauthenticate();
  }, []);

  return (
    <View style={styles.screen}>
      <MainLayout>
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
        {/* <PlaceHolders /> */}
        <Socials />
      </MainLayout>
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
