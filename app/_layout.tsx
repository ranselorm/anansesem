import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="welcome" />
          <Stack.Screen name="register" />
          <Stack.Screen name="get-started" />
          <Stack.Screen name="create-profile" />
          <Stack.Screen name="interests" />
          <Stack.Screen name="know-you" />
          <Stack.Screen name="upload-picture" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="settings" />
          {/* Tab layout for authenticated users */}
          <Stack.Screen name="(tabs)" />
        </Stack>
      </QueryClientProvider>
    </Provider>
  );
}
