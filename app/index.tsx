import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingContainer from "../screens/OnboardingContainer";
import Welcome from "../screens/Welcome";

const App: React.FC = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onBoarded, setOnboarded] = useState(false);

  // useEffect(() => {
  //   const checkOnboardingStatus = async () => {
  //     const status = await AsyncStorage.getItem("onboardingComplete");
  //     setIsOnboardingComplete(!!status);
  //     setLoading(false);
  //   };
  //   checkOnboardingStatus();
  // }, []);

  //DELETE!!!
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // const status = await AsyncStorage.getItem("onboardingComplete");
      setIsOnboardingComplete(false);
      setLoading(false);
    };
    checkOnboardingStatus();
  }, []);

  // const handleOnboardingFinish = async () => {
  //   await AsyncStorage.setItem("onboardingComplete", "true");
  //   setIsOnboardingComplete(true);
  // };

  const handleOnboardingFinish = async () => {
    // await AsyncStorage.setItem("onboardingComplete", "true");
    setIsOnboardingComplete(true);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // return isOnboardingComplete ? (
  //   <OnboardingContainer onFinish={handleOnboardingFinish} />
  // ) : (
  //   <Welcome />
  // );

  return isOnboardingComplete ? (
    <Welcome />
  ) : (
    <OnboardingContainer onFinish={handleOnboardingFinish} />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
