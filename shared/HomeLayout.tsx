// shared/HomeLayout.tsx
import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native";
import Header from "./Header";
import { MaterialIcons } from "@expo/vector-icons";
import HomeHeader from "./HomeHeader";

interface HomeLayoutProps {
  title?: string;
  isIcon?: boolean;
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({
  title,
  isIcon = false,
  children,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <HomeHeader title={title} isIcon={isIcon} />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: "flex-start",
  },
});

export default HomeLayout;
