import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingContainer from "../screens/OnboardingContainer";
import Welcome from "../screens/Welcome";
import Signup from "../screens/Signup";
import GetStarted from "@/screens/GetStarted";
import CreateProfile from "@/screens/CreateProfile";
import GetToKnowYou from "@/screens/GetToKnowYou";

const Stack = createStackNavigator();

export type RootStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const status = await AsyncStorage.getItem("onboardingComplete");
      setIsOnboardingComplete(!!status);
      setLoading(false);
    };
    checkOnboardingStatus();
  }, []);

  const handleOnboardingFinish = async () => {
    await AsyncStorage.setItem("onboardingComplete", "true");
    setIsOnboardingComplete(true);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboardingComplete ? (
        // Onboarding flow
        <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
          {() => <OnboardingContainer onFinish={handleOnboardingFinish} />}
        </Stack.Screen>
      ) : (
        // Welcome and Signup flow
        <>
          <Stack.Screen name="Welcome" component={Welcome} />

          {/* CHANGE THIS SCREEN LATER */}
          <Stack.Screen name="SignUp" component={GetToKnowYou} />
        </>
      )}
    </Stack.Navigator>
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
