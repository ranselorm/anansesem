import React, { useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import MainLayout from "../shared/MainLayout";
import Button from "@/components/ui/Button";
import { useSubmit } from "@/hooks/useSubmit";
import { setUser } from "../store/userSlice";
import { router } from "expo-router";
import { saveUserData } from "@/utils";

const UploadProfilePicture: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

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
    reference: userState.reference,
    interests: {
      favoriteStoryGenre: userState.interests.favoriteStoryGenre,
      favoriteCharacter: userState.interests.favoriteCharacter,
      creativePreference: userState.interests.creativePreference,
      favoriteColor: userState.interests.favoriteColor,
    },
    storyPreferences: {
      mood: userState.storyPreferences.mood,
      themeOfInterest: userState.storyPreferences.themeOfInterest,
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

  const handleSubmit = async () => {
    console.log(dataToSubmit);
    submitData(dataToSubmit, {
      onSuccess: async (responseData) => {
        try {
          await saveUserData(responseData?.data); // Save user data locally
          dispatch(setUser(responseData?.data)); // Update Redux state
          router.replace("/(tabs)/home");
        } catch (error) {
          console.error("Error saving data:", error);
          Alert.alert("Error", "Failed to save user data locally.");
        }
      },
      onError: (error: any) => {
        Alert.alert("Oops, something went wrong. Please try again!");
      },
    });
  };
  return (
    <View style={styles.screen}>
      <MainLayout title="Submit profile">
        <View style={styles.content}></View>
        <Button
          text={isPending ? "Submitting..." : "Submit"}
          absolute
          onPress={handleSubmit}
        />
      </MainLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  imageContainer: {
    position: "relative",
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "#FBCB46",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  placeholder: {
    height: "100%",
    width: "100%",
    borderRadius: 75,
    backgroundColor: "#FF8D6A",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    height: "100%",
    width: "100%",
    borderRadius: 75,
    resizeMode: "cover",
  },
  addIconContainer: {
    position: "absolute",
    bottom: 10,
    right: 6,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UploadProfilePicture;
