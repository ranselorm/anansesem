// shared/HomeHeader.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
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
  isIconLeft = true,
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
          // <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
          //   <View style={styles.placeholder}>
          //     <MaterialIcons name="person" size={30} color="#FFBB00" />
          //   </View>
          // </TouchableOpacity>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 90, height: 50, resizeMode: "contain" }}
          />
        ) : (
          <TouchableOpacity activeOpacity={0.9} onPress={handleBackPress}>
            <Text style={{ opacity: 1, fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        {true ? (
          <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
            {/* <View style={styles.placeholder}>
              <MaterialIcons name="person" size={30} color="#FFBB00" />
            </View> */}
            <Image
              source={{
                uri: "https://s.gravatar.com/avatar/6e70d1f802061fa4736e32317217280f?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fzr.png",
              }}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />
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
