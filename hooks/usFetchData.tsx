import { useQuery } from "@tanstack/react-query";

const API_URL = "https://anansesem-dev-api.azurewebsites.net/api/library";
const TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZYYVpDdnozeEN2RXJwZFctQk5pNSJ9.eyJuYW1lIjoiR2lkZW9uIEJlZHpyYWgiLCJlbWFpbCI6ImdiZWR6cmFoMUBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL2FuYW5zZXNlbS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8Njc2MDI0ZDBhOTE1ZmQ5MGMwZmMwZDI5IiwiYXVkIjpbImh0dHBzOi8vYW5hbnNlc2VtLWRldi1hcGkuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiaHR0cHM6Ly9hbmFuc2VzZW0udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNDc3MDY2MywiZXhwIjoxNzM0ODU3MDYzLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiaGZHaTJiWWdHeUxLSnBPSnFMT0hGNTl4c1FuMTdaTGEiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6Y29udGVudCIsImRlbGV0ZTpjb250ZW50IiwicmVhZDpjb250ZW50IiwicmVhZDp1c2VycyIsInVwZGF0ZTpjb250ZW50Il19.XKw00zhf_r59e1WvDPepdxg8h5_DuC82qAQOy9zdF-U51zSrife_YzgHM16fS4vDkLV9EbktV0dQxmEbCElvnyjwQoqtyBUjBKmHSalA1K1Xl548N_xiG6pYqsKcoEpYGPcc1sPk-HXiOCA-v1mSHqfecNF7o_D47VsKt-LA3FoDiLAO4GxwzVe_HV3hSJa7LA7SbX0eUnqtO8g34DAO3gW2wsVtW10j1OUzfMd5WxParowv-g-9eEjGvTVBdwDowD1VlDjAG4BE5zswli1qS1XmG7QZuXfjsq2Wp5y_r1nZnEqkp1CIFRjDvDrYk0vBXjKFNQpU-wkBYEaziI7srg";

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
