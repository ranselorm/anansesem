import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const fetchLibraryItems = async (token: string) => {
  const API_URL = "https://anansesem-dev-api.azurewebsites.net/api/library";

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `Network response was not ok: ${response.status} - ${errorMessage}`
    );
  }

  const data = await response.json();
  return data;
};

export const useFetchData = () => {
  const user = useSelector((state: RootState) => state.user.userResponse);
  const token = user?.token;

  const { data, isLoading, error } = useQuery({
    queryKey: ["libraryItems"],
    queryFn: () => fetchLibraryItems(token),
    enabled: !!token,
  });

  return { data, isLoading, error };
};
