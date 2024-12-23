// shared/HomeHeader.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontSizes } from "@/theme";
import { router } from "expo-router";

interface HeaderProps {
  title?: string;
  isIcon?: boolean;
  isIconLeft?: boolean;
}

const HomeHeader: React.FC<HeaderProps> = ({
  title,
  isIcon = true,
  isIconLeft,
}) => {
  const handlePress = () => {
    router.push("/profile");
  };

  const handleBackPress = () => {
    router.push("/(tabs)/home");
  };

  const handleSettingsPress = () => {
    router.push("/settings");
  };
  const handleDonePress = () => {
    router.push("/profile");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isIcon ? (
          <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
            <View style={styles.placeholder}>
              <MaterialIcons name="person" size={30} color="#FFBB00" />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.9} onPress={handleBackPress}>
            <Text style={{ opacity: 1, fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        {isIconLeft ? (
          <TouchableOpacity onPress={handleSettingsPress}>
            <MaterialIcons name="settings" size={25} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Text style={{ opacity: 0 }}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "transparent",
    zIndex: 99999,
  },
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomColor: "#ccc",
  },

  title: {
    fontSize: FontSizes.title,
    fontWeight: "bold",
    color: "#5D1889",
    textAlign: "center",
    flex: 1,
  },

  placeholder: {
    height: 40,
    width: 40,
    borderRadius: 75,
    backgroundColor: "#FF8D6A",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeHeader;
