import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/auth/login" />
      {/* <Stack.Screen name="select-profile" /> */}
    </Stack>
  );
}
