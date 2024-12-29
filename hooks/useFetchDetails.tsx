import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

interface StoryDetails {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration?: string;
  category?: string;
  readingLevel?: string;
}

const API_URL = "https://anansesem-dev-api.azurewebsites.net/api/details";

const fetchStoryByReference = async (reference: string, token: string) => {
  if (!token) {
    throw new Error("Token is missing");
  }

  const response = await axios.get(`${API_URL}?reference=${reference}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch story details");
  }

  return response.data;
};

export const useFetchDetails = (reference: string) => {
  const user = useSelector((state: RootState) => state.user.userResponse);
  const token = user?.token;

  return useQuery({
    queryKey: ["details", reference],
    queryFn: () => fetchStoryByReference(reference, token),
    enabled: !!reference && !!token,
    staleTime: 60000,
  });
};
