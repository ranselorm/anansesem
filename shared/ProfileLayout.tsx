import React from "react";
import { StyleSheet, SafeAreaView, View, StatusBar } from "react-native";
import Header from "./Header";
import { MaterialIcons } from "@expo/vector-icons";
import HomeHeader from "./HomeHeader";

interface ProfileLayoutProps {
  title?: string;
  isIcon?: boolean;
  isIconLeft?: boolean;
  children: React.ReactNode;
  bgColor?: string;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  title,
  isIcon = false,
  isIconLeft = false,
  children,
  bgColor,
}) => {
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: bgColor && bgColor }]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <HomeHeader title={title} isIcon={isIcon} isIconLeft={isIconLeft} />

      <View
        style={styles.contentContainer}
        // showsVerticalScrollIndicator={false}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 60,
    justifyContent: "flex-start",
  },
});

export default ProfileLayout;
