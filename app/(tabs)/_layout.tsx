import { router, Tabs } from "expo-router";
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
          backgroundColor: Colors.purple,
          borderWidth: 2,
          borderColor: Colors.main,
          borderRadius: 7,
          marginHorizontal: 2,
          marginBottom: 1,
          height: 60,
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
            <Ionicons name="sparkles-outline" color={Colors.main} size={size} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(tabs)/story-creator");
            console.log("Story Creator tab pressed");
          },
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="library-books" size={24} color={Colors.main} />
          ),
        }}
      />
    </Tabs>
  );
}
