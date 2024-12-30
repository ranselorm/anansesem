import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, RootState } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "@/components/SplashScreen";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const user = useSelector((state: RootState) => state.user.userResponse);

  useEffect(() => {
    const initialize = async () => {
      try {
        const completed = await AsyncStorage.getItem("onboardingCompleted");

        setOnboardingCompleted(completed === "true");

        if (!completed) {
          setIsLoading(false);
        } else if (user) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error during initialization:", error);
        setIsLoading(false); // Ensure the app doesn't stay stuck
      }
    };

    initialize();
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      if (!onboardingCompleted) {
        router.push("/welcome");
      } else if (user) {
        router.push("/(tabs)/home"); //CHANGE THIS BACK TO  !!!
      } else {
        router.push("/auth/login");
      }
    }
  }, [isLoading, onboardingCompleted, user]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="get-started" />
      <Stack.Screen name="register" />
      <Stack.Screen name="auth/login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
