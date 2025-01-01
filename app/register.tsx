import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import MainLayout from "../shared/MainLayout";
import { FontAwesome } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Yup from "yup";
import Button from "@/components/ui/Button";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { updateBio } from "@/store/userSlice";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .required("Password is required"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please retype your password"),
});

const Register: React.FC = () => {
  const dispatch = useDispatch();

  // Local state for inputs and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validate individual field
  const validateField = async (field: string, value: string) => {
    try {
      await validationSchema.validateAt(field, {
        email,
        password,
        retypePassword,
        [field]: value, // Update the field dynamically
      });
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" })); // Clear error
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: error.message, // Set error message for the field
      }));
    }
  };

  const handleRegister = async () => {
    // Validate the entire form
    try {
      await validationSchema.validate(
        { email, password, retypePassword },
        { abortEarly: false }
      );
      setErrors({});

      dispatch(
        updateBio({
          email,
          password,
        })
      );
      router.push("/create-profile");
    } catch (validationErrors: any) {
      const formattedErrors: { [key: string]: string } = {};
      validationErrors.inner.forEach((error: any) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <View style={styles.screen}>
      <MainLayout title="Register">
        <View style={styles.container}>
          <TextInput
            style={[styles.input, styles.emailInput]}
            placeholder="Email"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              validateField("email", value);
            }}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : (
            <Text style={styles.placeholder}>Placeholder</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              validateField("password", value);
            }}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : (
            <Text style={styles.placeholder}>Placeholder</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Re-type Password"
            secureTextEntry
            value={retypePassword}
            onChangeText={(value) => {
              setRetypePassword(value);
              validateField("retypePassword", value);
            }}
          />
          {errors.retypePassword ? (
            <Text style={styles.errorText}>{errors.retypePassword}</Text>
          ) : (
            <Text style={styles.placeholder}>Placeholder</Text>
          )}

          <Button text="Next" onPress={handleRegister} />
          <Text style={styles.signInText}>
            Already have an account?
            <TouchableOpacity onPress={() => router.replace("/auth/login")}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </Text>

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
    marginTop: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
    // gap: 20,
  },
  input: {
    backgroundColor: "#FBCB46",
    borderRadius: 50,
    // marginBottom: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#000",
  },
  emailInput: {
    backgroundColor: "#C4A1FF",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    // marginBottom: 10,
    marginLeft: 10,
    marginVertical: 8,
  },
  placeholder: {
    opacity: 0,
    marginVertical: 8,
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
    marginTop: 150,
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

export default Register;
