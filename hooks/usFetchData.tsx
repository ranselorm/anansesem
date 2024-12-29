import { RootState } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
const API_URL = "https://anansesem-dev-api.azurewebsites.net/api/library";
const NICK_URL = "https://anansesem-dev-api.azurewebsites.net/api/nickname";

const TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZYYVpDdnozeEN2RXJwZFctQk5pNSJ9.eyJuYW1lIjoiWnJhaCIsImVtYWlsIjoiZ2JlZHpyYWgxQGdtYWlsLmNvbSIsImlzcyI6Imh0dHBzOi8vYW5hbnNlc2VtLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NzZjMzk2M2ZiYzM5ZTA2YTFiZjNmNWYiLCJhdWQiOlsiaHR0cHM6Ly9hbmFuc2VzZW0tZGV2LWFwaS5henVyZXdlYnNpdGVzLm5ldC8iLCJodHRwczovL2FuYW5zZXNlbS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzM1MzgyMjkxLCJleHAiOjE3MzU0Njg2OTEsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJndHkiOiJwYXNzd29yZCIsImF6cCI6IktodVlyek50aTNKYkQ4WWFhSzhHbnNCNDhzV0xDQjR4IiwicGVybWlzc2lvbnMiOltdfQ.jtf1P1pOg2vcPKtw01Cs7aNhsEqzCOKBHrk1pFUijkyxHJMvYEBbnwtCQ5KHl7Ci19rybke40tX_7Bfog-vN2VgrURpnTPLWz2TAOpW1qTkgmBy60sQ-R02F8arVohblA5b-VOy6IUlpkDpkEGbgTeH2tuYiAKdXFtX9paDAVVh7H3AbCY4O8i-ET-pJCj4Uxt1NPoz3TS_UVhaBRsGUMZ4-BhgnTQGI-IHNHzB81uNAuiOOj-SIgrujTcy-5VqOxyyCvJ2b7xWeGZACl369qchlRAupBD5BkYwSMwR3GzgUvfsYIg9ArLDhYfchJ5WsG0AUYWEWzqQ4xkbypY3G-Q";

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

  console.log(token, "NEW TOKEN");

  const { data, isLoading, error } = useQuery({
    queryKey: ["libraryItems"],
    queryFn: () => fetchLibraryItems(token),
    enabled: !!token,
  });

  return { data, isLoading, error };
};
