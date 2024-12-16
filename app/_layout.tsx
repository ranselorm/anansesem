import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="register" />
      <Stack.Screen name="get-started" />
      <Stack.Screen name="create-profile" />
      <Stack.Screen name="know-you" />
      <Stack.Screen name="upload-picture" />

      {/* Tab layout for authenticated users */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
