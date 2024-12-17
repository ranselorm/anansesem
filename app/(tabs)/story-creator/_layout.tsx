import { Stack } from "expo-router";

export default function StoryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="story-generator" /> */}
      <Stack.Screen name="playback" />
    </Stack>
  );
}
