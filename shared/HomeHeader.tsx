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
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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
    router.back();
  };

  const handleSettingsPress = () => {
    router.push("/settings");
  };
  const handleDonePress = () => {
    router.push("/profile");
  };
  const user = useSelector((state: RootState) => state.user.userResponse);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isIcon ? (
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 90, height: 50, resizeMode: "contain" }}
          />
        ) : (
          <TouchableOpacity activeOpacity={0.9} onPress={handleBackPress}>
            <Text style={{ opacity: 1, fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
        )}
        {true ? (
          <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
            <Image
              source={{
                uri: user?.picture || "",
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
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "transparent",
    zIndex: 99999,
    marginBottom: 20,
  },
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 30,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
    // marginBottom: 100,
    // backgroundColor: "yellow",
  },

  title: {
    fontSize: FontSizes.title,
    fontWeight: "bold",
    color: "#5D1889",
    textAlign: "center",
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
