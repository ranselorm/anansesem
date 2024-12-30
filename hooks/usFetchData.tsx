import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const fetchLibraryItems = async (token: string) => {
  const API_URL = "https://anansesem-dev-api.azurewebsites.net/api/library";

  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Error: ${response.status} - ${response.statusText}. Details: ${errorMessage}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Network error: ${error.message}`);
  }
};

export const useFetchData = () => {
  const user = useSelector((state: RootState) => state.user.userResponse);
  const token = user?.token;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["libraryItems", token],
    queryFn: () => fetchLibraryItems(token!),
    enabled: !!token,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, error, refetch };
};
