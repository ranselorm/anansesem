import React, { useState } from "react";
import { Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ResetOnboarding: React.FC = () => {
  const [shouldRemove, setShouldRemove] = useState(false);

  const handleReset = async () => {
    if (shouldRemove) {
      try {
        await AsyncStorage.removeItem("onboardingComplete");
        Alert.alert("Success", "Onboarding reset!");
        setShouldRemove(false); // Reset state
      } catch (error) {
        Alert.alert("Error", "Failed to reset onboarding.");
      }
    }
  };

  return (
    <Button
      title="Reset Onboarding"
      onPress={() => {
        setShouldRemove(true);
        handleReset();
      }}
    />
  );
};

export default ResetOnboarding;
