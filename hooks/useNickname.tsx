import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const API_URL = "https://anansesem-dev-api.azurewebsites.net/api/nickname";

export const fetchNicknames = async (name: string): Promise<string[]> => {
  const response = await fetch(`${API_URL}?name=${encodeURIComponent(name)}`, {
    method: "GET",
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
  // Debounce the API call to reduce frequency
  const [debouncedName, setDebouncedName] = useState(name);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(name);
    }, 300); // Wait 300ms before triggering

    return () => {
      clearTimeout(handler);
    };
  }, [name]);

  return useQuery({
    queryKey: ["nicknameSuggestions", debouncedName],
    queryFn: () => fetchNicknames(debouncedName),
    enabled: !!debouncedName, // Only fetch when there's a name
    staleTime: 60000,
  });
};
