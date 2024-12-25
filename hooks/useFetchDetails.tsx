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
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZYYVpDdnozeEN2RXJwZFctQk5pNSJ9.eyJuYW1lIjoiR2lkZW9uIEJlZHpyYWgiLCJlbWFpbCI6ImdiZWR6cmFoMUBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL2FuYW5zZXNlbS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8Njc2MDI0ZDBhOTE1ZmQ5MGMwZmMwZDI5IiwiYXVkIjpbImh0dHBzOi8vYW5hbnNlc2VtLWRldi1hcGkuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiaHR0cHM6Ly9hbmFuc2VzZW0udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNTEyNDkwMywiZXhwIjoxNzM1MjExMzAzLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiaGZHaTJiWWdHeUxLSnBPSnFMT0hGNTl4c1FuMTdaTGEiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6Y29udGVudCIsImRlbGV0ZTpjb250ZW50IiwicmVhZDpjb250ZW50IiwicmVhZDp1c2VycyIsInVwZGF0ZTpjb250ZW50Il19.ijPx4s0nVMruCJ7WCH40Q9R63-brF8MpOias6Bs7E8ERbe1nfFga-QP612Ba-LUv2Vmn7fzBHmEVjbQDVZm_8MbrKG1img1v-htbXy0nw1ro4-gngMxSEvb-uy2E2EWS9z-vqpoefU-dY-AgcYLG9uDkw7OEn4C-gynualESOmMs-Ax3f6_NryYDqh3W9otkcwj78jdq0WaMMDu56lJCtI2chKa7f4QynJYPkpKHE67sViReLv03fTD03QOIkuQNIPj69mx5DRwtC9t5-ZadGFJDPXyldmhNQXh6E-tm97lDXu8_P6WKWvhGQQC3MoM8XeCWuz4L1tJ2ZNYp7ei9Iw";

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
