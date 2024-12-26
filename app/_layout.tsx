import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { getUserData } from "@/utils";
export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = new QueryClient();

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUserData();
      if (user) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/auth/login");
      }
      setIsLoading(false);
    };

    checkUser();
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="welcome" />
          {/* <Stack.Screen name="register" /> */}
          <Stack.Screen name="get-started" />
          <Stack.Screen name="create-profile" />
          <Stack.Screen name="interests" />
          <Stack.Screen name="know-you" />
          <Stack.Screen name="upload-picture" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </QueryClientProvider>
    </Provider>
  );
}
