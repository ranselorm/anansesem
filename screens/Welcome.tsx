import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";

const Welcome: React.FC = () => {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Image source={require("../assets/images/logo-icon.png")} />
          <Text style={styles.title}>Welcome to Anansesem</Text>
          <Text style={styles.text}>
            Discover a world of imagination and learning! Create your own
            stories, explore a vast library and learn while you play. Anansesem
            brings stories to life, tailored just for you!
          </Text>
        </View>
        <View style={styles.agreementContainer}>
          <Text style={styles.textSmall}>
            By clicking “I Agree”, you are certifying that you read our user
            agreement and give all required permissions to Anansesem.
          </Text>
          <TouchableOpacity
            activeOpacity={1.2}
            onPress={() => sheetRef.current?.open()}
          >
            <Text style={styles.textSmall2}>Read our user agreement</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet ref={sheetRef}>
        <Text>
          The smart 😎, tiny 📦, and flexible 🎗 bottom sheet your app craves 🚀
        </Text>
      </BottomSheet>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>I Agree</Text>
        <MaterialIcons
          name="arrow-forward"
          size={22}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#c4a1ff",
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    gap: 20,
    marginTop: 20, // Add space from the top
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "#000",
    maxWidth: 150,
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 40,
    textAlign: "center",
    lineHeight: 22,
  },
  agreementContainer: {
    paddingHorizontal: 40,
    marginTop: 30,
  },
  textSmall: {
    fontSize: 13,
    textAlign: "center",
  },
  textSmall2: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: "20%",
    right: "20%",
    backgroundColor: "#D0EE30",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    backgroundColor: "#000",
    borderRadius: 50,
    padding: 5,
  },
});

export default Welcome;
