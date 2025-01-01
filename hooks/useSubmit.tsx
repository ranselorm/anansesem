import { RootState } from "@/store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const serverUrl = "https://anansesem-dev-api.azurewebsites.net/api/register";
const loginUrl = "https://anansesem-dev-api.azurewebsites.net/api/login";

export const useSubmit = () => {
  return useMutation({
    mutationFn: async (data: { [key: string]: any }) => {
      const response = await axios.post(serverUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("Data sent successfully!");
    },
    onError: (error) => {
      console.error("Error sending data:");
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { [key: string]: any }) => {
      const response = await axios.post(loginUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Data sent successfully!", data);
    },
    onError: (error) => {
      console.error("Error sending data:", error);
    },
  });
};
