import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MainLayout from "../shared/MainLayout";
import Button from "@/components/ui/Button";
import { useSubmit } from "@/hooks/useSubmit";

const UploadProfilePicture: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);

  const { mutate: submitData, isPending } = useSubmit();

  const dataToSubmit = {
    bio: {
      fullName: userState.bio.fullName,
      nickName: userState.bio.nickName,
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
      mood: "FUNNY",
      themeOfInterest: "PROBLEM_SOLVING",
    },
    languageSkills: userState.languageSkills,
  };

  // const dataToSubmit = {
  //   bio: {
  //     fullName: "Stephen Akpebi",
  //     nickName: "Shooting Star",
  //     email: "stephen.akpekbi@test.com",
  //     dateOfBirth: new Date().toISOString(),
  //     gender: "MALE",
  //     preferredLanguage: "ENGLISH",
  //     avatar: "https://www.upwork.com/mc/documents/colorschemeavatar.jpg",
  //     readingLevel: "Advanced",
  //     phoneNumber: "0557587124",
  //   },
  //   reference: "tes42386",
  //   interests: {
  //     favoriteStoryGenre: "ADVENTURE",
  //     favoriteCharacter: "Naruto",
  //     creativePreference: "READING",
  //     favoriteColor: "Green",
  //   },
  //   storyPreferences: {
  //     mood: "FUNNY",
  //     themeOfInterest: "PROBLEM_SOLVING",
  //   },
  //   languageSkills: [
  //     {
  //       language: "English",
  //       reading: "INTERMEDIATE",
  //       writing: "INTERMEDIATE",
  //       listening: "INTERMEDIATE",
  //       speaking: "INTERMEDIATE",
  //     },
  //   ],
  // };

  // console.log(dataToSubmit, "DATA");

  const handleSubmit = () => {
    const payload = {
      bio: {
        ...userState.bio,
      },
      reference: userState.reference,
      interests: userState.interests,
      storyPreferences: userState.storyPreferences,
      languageSkills: userState.languageSkills,
    };

    console.log("IN SUBMIT", dataToSubmit);
    submitData(dataToSubmit, {
      onSuccess: () => {
        Alert.alert("Success");
      },
      onError: (error: any) => {
        Alert.alert("Error", error.message || "Failed to submit data.");
      },
    });
  };

  return (
    <View style={styles.screen}>
      <MainLayout title="Upload a profile picture">
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
