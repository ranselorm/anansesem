import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/userSlice";
import MainLayout from "@/shared/MainLayout";
import Button from "@/components/ui/Button";
import { RootState } from "@/store";
import { router } from "expo-router";
import { Colors } from "@/theme";
import { useSubmit } from "@/hooks/useSubmit";
import { saveUserData, OnboardingCompleted } from "@/utils";
import { jwtDecode } from "jwt-decode";
import Spinner from "react-native-loading-spinner-overlay";

const Interests: React.FC = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

  const [favoriteStoryGenre, setFavoriteStoryGenre] = useState(
    userState.interests.favoriteStoryGenre || ""
  );
  const [favoriteCharacter, setFavoriteCharacter] = useState(
    userState.interests.favoriteCharacter || ""
  );
  const [creativePreference, setCreativePreference] = useState(
    userState.interests.creativePreference || ""
  );
  const [favoriteColor, setFavoriteColor] = useState(
    userState.interests.favoriteColor || ""
  );
  const [mood, setMood] = useState(userState.storyPreferences.mood || "");
  const [themeOfInterest, setThemeOfInterest] = useState(
    userState.storyPreferences.themeOfInterest || ""
  );

  const generateReference = (): string => {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 10);
    return `REF-${timestamp}-${randomString}`;
  };
  const newReference = generateReference();

  const { mutate: submitData, isPending } = useSubmit();

  const dataToSubmit = {
    bio: {
      fullName: userState.bio.fullName,
      nickName: userState.bio.nickName,
      password: userState.bio.password,
      email: userState.bio.email,
      dateOfBirth: userState.bio.dateOfBirth,
      gender: userState.bio.gender,
      preferredLanguage: userState.bio.preferredLanguage,
      avatar: userState.bio.avatar,
      readingLevel: userState.bio.readingLevel,
      phoneNumber: userState.bio.phoneNumber,
    },
    reference: newReference,
    interests: {
      favoriteStoryGenre,
      favoriteCharacter,
      creativePreference,
      favoriteColor,
    },
    storyPreferences: {
      mood,
      themeOfInterest,
    },
    languageSkills: userState.languageSkills || [
      {
        language: "English",
        reading: "INTERMEDIATE",
        writing: "INTERMEDIATE",
        listening: "INTERMEDIATE",
        speaking: "INTERMEDIATE",
      },
    ],
  };

  const colors = [
    { name: "Candy Red", value: "#FF0800" },
    { name: "Bubble Pink", value: "#FFC1CC" },
    { name: "Shine", value: "#FFD700" },
  ];

  const selectColor = (color: string) => {
    setFavoriteColor(color === favoriteColor ? "" : color);
  };

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
      console.log("USER SESSION UPDATED!", updatedUser);
    } catch (error) {
      console.error("Error updating session:", error);
      Alert.alert("Error", "Failed to update user session.");
    }
  };
  const handleSubmit = async () => {
    if (
      !favoriteStoryGenre ||
      !favoriteCharacter ||
      !creativePreference ||
      !favoriteColor ||
      !mood ||
      !themeOfInterest
    ) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    submitData(dataToSubmit, {
      onSuccess: async (responseData) => {
        try {
          await updateUserSession(responseData);
          await OnboardingCompleted();
          router.replace("/(tabs)/home");
          Alert.alert("REGISTRATION SUCCESSFUL", "USER CREATED");
        } catch (error) {
          console.error("Error saving data:", error);
          Alert.alert("Error", "Failed to save user data locally.");
        }
      },
      onError: (error: any) => {
        Alert.alert(
          "Oops, something went wrong. Please try again!",
          error.message
        );
      },
    });
  };

  return (
    <View style={styles.screen}>
      <MainLayout title="Interests">
        <View style={styles.content}>
          <Text style={styles.description}>Tell us about your interests</Text>
          <View>
            <Text style={styles.label1}>Interests</Text>
            <Text style={styles.label}>Favorite story genre</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={favoriteStoryGenre}
                onValueChange={setFavoriteStoryGenre}
                style={styles.picker}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="ADVENTURE" value="ADVENTURE" />
                <Picker.Item label="FANTASY" value="FANTASY" />
                <Picker.Item label="MYSTERY" value="MYSTERY" />
                <Picker.Item label="FOLKLORE" value="FOLKLORE" />
                <Picker.Item label="SCIENCE_FICTION" value="SCIENCE_FICTION" />
              </Picker>
            </View>

            <Text style={styles.label}>Favorite Character</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Spiderman"
              value={favoriteCharacter}
              onChangeText={setFavoriteCharacter}
            />

            <Text style={styles.label}>Creative Preference</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={creativePreference}
                onValueChange={setCreativePreference}
                style={styles.picker}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="READING" value="READING" />
                <Picker.Item label="WRITING" value="WRITING" />
                <Picker.Item label="DRAWING" value="DRAWING" />
              </Picker>
            </View>

            <Text style={styles.label}>Favorite Color</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 30 }}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color.name}
                  style={[styles.colorContainer]}
                  onPress={() => selectColor(color.name)}
                >
                  <View
                    style={[
                      styles.colorBlock,
                      { backgroundColor: color.value },
                    ]}
                  />
                  <Text
                    style={[
                      styles.colorName,
                      favoriteColor === color.name && { fontWeight: 900 },
                    ]}
                  >
                    {color.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={[styles.label1, { marginTop: 20 }]}>
            Story preferences
          </Text>
          <Text style={styles.label}>Mood</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={mood}
              onValueChange={setMood}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="FUNNY" value="FUNNY" />
              <Picker.Item label="SERIOUS" value="SERIOUS" />
              <Picker.Item label="EDUCATION" value="EDUCATION" />
              <Picker.Item label="LIGHT_HEARTED" value="LIGHT_HEARTED" />
            </Picker>
          </View>

          <Text style={styles.label}>Theme of Interest</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={themeOfInterest}
              onValueChange={setThemeOfInterest}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="FRIENDSHIP" value="FRIENDSHIP" />
              <Picker.Item label="MAGIC" value="MAGIC" />
              <Picker.Item label="PROBLEM_SOLVING" value="PROBLEM_SOLVING" />
              <Picker.Item label="CULTURE" value="CULTURE" />
              <Picker.Item label="ANIMALS" value="ANIMALS" />
              <Picker.Item label="OTHER" value="OTHER" />
            </Picker>
          </View>

          <Button
            text={isPending ? "Submitting" : "Submit"}
            onPress={handleSubmit}
            absolute
          />
        </View>
      </MainLayout>
      <Spinner
        visible={isPending}
        customIndicator={
          <View style={styles.spinnerContainer}>
            <Image
              source={require("@/assets/icons/app-icon.png")}
              style={styles.icon}
            />
            <Text style={styles.spinnerText}>
              Hang tight, while we process your request
            </Text>
            <ActivityIndicator size="small" style={{ marginTop: 20 }} />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: { flex: 1, paddingHorizontal: 10 },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
    marginTop: -20,
  },
  container: {
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  label1: { marginBottom: 6, fontWeight: 500, fontSize: 17 },
  label: { marginBottom: 4 },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 40,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: Colors.yellow,
  },
  pickerContainer: {
    borderWidth: 0.5,
    borderColor: "#000",
    borderRadius: 50,
    marginBottom: 10,
    height: 40,
    justifyContent: "center",
    backgroundColor: Colors.yellow,
  },
  picker: { height: 50 },
  colorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  colorBlock: { height: 24, width: 24, borderRadius: 3 },
  colorName: { fontSize: 12, color: "#000" },
  colorSelected: { borderWidth: 2, borderColor: "#FFD700", padding: 2 },

  spinnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: 300,
    height: 150,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  spinnerText: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
    textAlign: "center",
  },

  icon: {
    width: 90,
    height: 90,
    marginTop: -80,
  },
});

export default Interests;
