import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Alert } from "react-native";
import { router } from "expo-router";

const API_URL =
  "https://anansesem-dev-api.azurewebsites.net/api/generate-story";

export const useSubmitStory = () => {
  const user = useSelector((state: RootState) => state.user.userResponse);

  return useMutation({
    mutationFn: async (data: { [key: string]: any }) => {
      if (!user?.token) {
        throw new Error("User token is missing!");
      }
      const response = await axios.post(API_URL, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Story submitted successfully:", data);
      // Alert.alert("Success", "Story submitted successfully!");
      router.replace("/(tabs)/home");
    },
    onError: (error) => {
      console.error("Error submitting story:", error);
      Alert.alert("Error", "Failed to submit the story.");
    },
  });
};
