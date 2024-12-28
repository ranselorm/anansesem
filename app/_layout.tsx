import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import Loader from "@/components/Loader";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                <AppContent />
              </QueryClientProvider>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: any) => state.user.userResponse);
  console.log("USER", user);

  useEffect(() => {
    const checkUser = async () => {
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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="get-started" />
      <Stack.Screen name="interests" />
      <Stack.Screen name="know-you" />
      <Stack.Screen name="create-profile" />
    </Stack>
  );
}

// <Stack screenOptions={{ headerShown: false }}>
//   <Stack.Screen name="index" />
//   <Stack.Screen name="welcome" />
//   <Stack.Screen name="get-started" />
//   <Stack.Screen name="create-profile" />
//   <Stack.Screen name="interests" />
//   <Stack.Screen name="know-you" />
//   <Stack.Screen name="upload-picture" />
//   <Stack.Screen name="profile" />
//   <Stack.Screen name="settings" />
//   <Stack.Screen name="(tabs)" />
// </Stack>;
