import React, { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, RootState } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, router, Stack } from "expo-router";
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
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!onboardingCompleted) {
        <Redirect href="/onboarding" />;
      } else if (user?.isLoggedIn) {
        <Redirect href="/(tabs)/home" />;
      } else if (!user) {
        <Redirect href="/auth/login" />;
      }
    }
  }, [isLoading, onboardingCompleted, user]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="register" />
      <Stack.Screen name="create-profile" />
      <Stack.Screen name="get-started" />
    </Stack>
  );
}
