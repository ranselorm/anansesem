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
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZYYVpDdnozeEN2RXJwZFctQk5pNSJ9.eyJuYW1lIjoiR2lkZW9uIEJlZHpyYWgiLCJlbWFpbCI6ImdiZWR6cmFoMUBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL2FuYW5zZXNlbS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8Njc2MDI0ZDBhOTE1ZmQ5MGMwZmMwZDI5IiwiYXVkIjpbImh0dHBzOi8vYW5hbnNlc2VtLWRldi1hcGkuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiaHR0cHM6Ly9hbmFuc2VzZW0udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNTAzODM5NSwiZXhwIjoxNzM1MTI0Nzk1LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiaGZHaTJiWWdHeUxLSnBPSnFMT0hGNTl4c1FuMTdaTGEiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6Y29udGVudCIsImRlbGV0ZTpjb250ZW50IiwicmVhZDpjb250ZW50IiwicmVhZDp1c2VycyIsInVwZGF0ZTpjb250ZW50Il19.hykUgaIn0TUY-QjoR-IINratn-kjdqNAMgOwCv0xx8RQGfIP_pdzs9b3jYvi5TIugLxyVRzwyUiasHUq2rKTULDGyQGheH0nmAsoeozvhJ4dUCy68WzlUKMlZg8R5j03H_XhrTEjxNSxBCUce7cj_hRvm_PCGFBJpRz5hHStM7Mh3GHbrExNLXUdA56sBXpHMJ5VpaO5Co4TsgcNofy8YWy2xUHdoxKivSDkFV_Afq9SBYGMK41IcmfWMFb1yvcaLU0VMwTltll7ctfTOpMtcDvuRNGIm8gWZT3ol7GI3jwu3xyaPDvRwwPxOwZCU06IcW_ef5SUh0TNV74krOuF4w";

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
