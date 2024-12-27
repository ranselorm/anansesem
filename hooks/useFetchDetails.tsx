import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
const TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZYYVpDdnozeEN2RXJwZFctQk5pNSJ9.eyJuYW1lIjoiR2lkZW9uIEJlZHpyYWgiLCJlbWFpbCI6ImdiZWR6cmFoMUBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL2FuYW5zZXNlbS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8Njc2MDI0ZDBhOTE1ZmQ5MGMwZmMwZDI5IiwiYXVkIjpbImh0dHBzOi8vYW5hbnNlc2VtLWRldi1hcGkuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiaHR0cHM6Ly9hbmFuc2VzZW0udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNTMyOTMyNCwiZXhwIjoxNzM1NDE1NzI0LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiaGZHaTJiWWdHeUxLSnBPSnFMT0hGNTl4c1FuMTdaTGEiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6Y29udGVudCIsImRlbGV0ZTpjb250ZW50IiwicmVhZDpjb250ZW50IiwicmVhZDp1c2VycyIsInVwZGF0ZTpjb250ZW50Il19.Wtb0A4gYf-lPp16b2D4UshwAXYfMfJpYkC64SKU5lCQCqFqlQbeB9ExGRIB7T2NPzGSqVuFpLAA3wIgpyfaY4VI70XgFbTjW8nodj0WokiXi2KjuSzFzUZ8I0eqjZ29HEcIX99_2HOuBlZTZV-6ZNF3spG4gJT8Lfo4MTbh9mL92dYq4fmhlm8dkD9HpKmvvWSKXtab2RjBWD2TVR8TF_zRqkZwKa0AV_i95UhUtaaWwkDNFL-sA2Z0VhDgcls5pTnlpVsE1WjL_vupfklqoE7fj-UJ7EhjsYUwL5yMUEV6LvHCzbrPgNB0ilzD4jkqGEXmlHGdVAC3i7ZfUpwpkuw";

const fetchStoryByReference = async (reference: string) => {
  const response = await axios.get(`${API_URL}?reference=${reference}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch story details");
  }
  return response.data;
};

export const useFetchDetails = (reference: string) => {
  return useQuery({
    queryKey: ["details", reference],
    queryFn: () => fetchStoryByReference(reference),
    enabled: !!reference,
  });
};
