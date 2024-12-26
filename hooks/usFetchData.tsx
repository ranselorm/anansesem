import { useMutation, useQuery } from "@tanstack/react-query";
const API_URL = "https://anansesem-dev-api.azurewebsites.net/api/library";
const NICK_URL = "https://anansesem-dev-api.azurewebsites.net/api/nickname";

const TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZYYVpDdnozeEN2RXJwZFctQk5pNSJ9.eyJuYW1lIjoiR2lkZW9uIEJlZHpyYWgiLCJlbWFpbCI6ImdiZWR6cmFoMUBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL2FuYW5zZXNlbS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8Njc2MDI0ZDBhOTE1ZmQ5MGMwZmMwZDI5IiwiYXVkIjpbImh0dHBzOi8vYW5hbnNlc2VtLWRldi1hcGkuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiaHR0cHM6Ly9hbmFuc2VzZW0udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNTIzNzUzMiwiZXhwIjoxNzM1MzIzOTMyLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiaGZHaTJiWWdHeUxLSnBPSnFMT0hGNTl4c1FuMTdaTGEiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6Y29udGVudCIsImRlbGV0ZTpjb250ZW50IiwicmVhZDpjb250ZW50IiwicmVhZDp1c2VycyIsInVwZGF0ZTpjb250ZW50Il19.A1dPjMcpQYtfstHcZLHhwtyjfEAFnW1pv-teSXTOrRrDeb5q-9X7Y7VnFEEsAdT5nSDJBFMpojIgmzw-ySWLoci2kKcdP4v-N9C873xZXIq5xHdwnMWCSYkcrUBq8A-3SWtOLG6iwRCOy-y6ZZyRZBviOP6Xdn_V-yR53gS0ekI1mpQpR2nwDiCjnfksWqG_tZdI7hsb_W-jcxiSoU5U0SunIQRFkffvI28VeSauVW0MzKhuw1vjs2QvZqv6oTW9vd95vbjA2psUs6EYVtyMlVfuxn_nCxFVb-Qru9jD3znjeLWOM818nUYPuDniKq8M0x5CHDnaMUgJ5VFQniZYqA";

export const fetchLibraryItems = async () => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["libraryItems"],
    queryFn: fetchLibraryItems,
  });

  return { data, isLoading, error };
};

export const fetchNicknames = async (name: string): Promise<string[]> => {
  const response = await fetch(`${API_URL}?name=${encodeURIComponent(name)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `Network response was not ok: ${response.status} - ${errorMessage}`
    );
  }

  const data = await response.json();
  return data?.data?.names || []; // Safely access names array
};

export const useNicknameSuggestions = (name: string) => {
  return useQuery({
    queryKey: ["nicknameSuggestions", name],
    queryFn: () => fetchNicknames(name),
    enabled: !!name,
    staleTime: 60000,
  });
};
