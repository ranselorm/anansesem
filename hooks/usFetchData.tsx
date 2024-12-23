import { useQuery } from "@tanstack/react-query";

const API_URL = "https://anansesem-dev-api.azurewebsites.net/api/library";
const TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZYYVpDdnozeEN2RXJwZFctQk5pNSJ9.eyJuYW1lIjoiR2lkZW9uIEJlZHpyYWgiLCJlbWFpbCI6ImdiZWR6cmFoMUBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL2FuYW5zZXNlbS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8Njc2MDI0ZDBhOTE1ZmQ5MGMwZmMwZDI5IiwiYXVkIjpbImh0dHBzOi8vYW5hbnNlc2VtLWRldi1hcGkuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiaHR0cHM6Ly9hbmFuc2VzZW0udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNDk1NDA1NywiZXhwIjoxNzM1MDQwNDU3LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiaGZHaTJiWWdHeUxLSnBPSnFMT0hGNTl4c1FuMTdaTGEiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6Y29udGVudCIsImRlbGV0ZTpjb250ZW50IiwicmVhZDpjb250ZW50IiwicmVhZDp1c2VycyIsInVwZGF0ZTpjb250ZW50Il19.EEPzoNDMoq0CtWwbbS4K2qkcBNDEgPExv68a-Q_Z_YrB6yIxigvodWCmI3XSWh_Y7FsfGTbHNFWswAzjosLAWkR43hGkn7AMFYQHQUfs9lJwytOP6tNTbTlX3TwRAzcvkb8OyO17CFd8Md-esgM2sA4rjaXYFb_8pFVtlUZs5UY2WMqZ54f64s9gJO8h7FE9okPdY4D-CwXuAlCJsEpvyOzV_rXbPybBzj4QijUbjKkOVeLLEdvjjk3UFZ1DfYcMv3AqNwiGSsWNsJh38jb9MQ2pRGZRAsu50pm-srWAiOatbLp6u9NtLc_NRCEBNUr8kzPUckHL9wec2BVAAzgGBQ";

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
