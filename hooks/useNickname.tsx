import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const API_URL = "https://anansesem-dev-api.azurewebsites.net/api/nickname";

export const fetchNicknames = async (
  name: string,
  token: string
): Promise<string[]> => {
  if (!token) {
    throw new Error("Token is missing");
  }

  const response = await fetch(`${API_URL}?name=${encodeURIComponent(name)}`, {
    method: "GET",
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
  return data?.data?.names || [];
};

export const useNickname = (name: string) => {
  const user = useSelector((state: RootState) => state.user.userResponse);
  const token = user?.token;

  return useQuery({
    queryKey: ["nicknameSuggestions", name],
    queryFn: () => fetchNicknames(name, token),
    enabled: !!name && !!token,
    staleTime: 60000,
  });
};
