import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: "#000",
        tabBarActiveTintColor: "#000",
        tabBarStyle: {
          backgroundColor: "#b2ff59",
          borderWidth: 2,
          borderColor: "#000",
          borderRadius: 20,
          marginHorizontal: 10,
          marginBottom: 10,
          height: 70,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="stacked-bar-chart"
              size={25}
              color={Colors.main}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "For You",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-circle-sharp"
              size={24}
              color={Colors.main}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="story-creator"
        options={{
          title: "AI Story Creator",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={Colors.main} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="libray"
        options={{
          title: "Library",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" size={24} color={Colors.main} />
          ),
        }}
      />
    </Tabs>
  );
}
