import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Alert } from "react-native";

const API_URL = "https://anansesem-dev-api.azurewebsites.net/api/action";

export const useLikeStory = () => {
  const user = useSelector((state: RootState) => state.user.userResponse);

  return useMutation({
    mutationFn: async (reference: string) => {
      if (!user?.token) {
        throw new Error("User token is missing!");
      }

      const response = await axios.get(
        `${API_URL}?type=like&reference=${reference}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.data?.status) {
        throw new Error(response.data?.message || "Failed to like the story.");
      }

      return response.data;
    },
    onSuccess: (data, variables) => {
      console.log(`Story liked successfully for reference: ${variables}`, data);
    },
    onError: (error: any) => {
      console.error("Error liking story:", error);
      Alert.alert("Error", error?.cause || "Failed to like the story.");
    },
  });
};
