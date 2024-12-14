import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import { terms } from "@/constants";
import ResetOnboarding from "@/components/Reset";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../app/index";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

const Welcome: React.FC = () => {
  const sheetRef = useRef<BottomSheetMethods>(null);
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleAgree = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.screen}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          {/* <ResetOnboarding /> */}
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

      <TouchableOpacity
        style={styles.button}
        activeOpacity={1.2}
        onPress={handleAgree}
      >
        <Text style={styles.buttonText}>I Agree</Text>
        <MaterialIcons
          name="arrow-forward"
          size={22}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <BottomSheet ref={sheetRef} style={styles.bottomSheet}>
        <ScrollView
          // contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={true}
          indicatorStyle="white"
          style={{ paddingHorizontal: 20 }}
        >
          <Text style={styles.heading}>Anansesem Terms and Conditions</Text>
          <Text style={styles.content}>
            Please read these Terms and Conditions carefully before using the
            Anansesem app.
          </Text>
          {terms.map((term, index) => (
            <Text style={styles.content} key={index}>
              <Text>{term.number}. </Text>
              {term.text}
            </Text>
          ))}
          <Text style={styles.content}>
            By using the Anansesem app, you agree to these Terms and Conditions.
            If you have any questions, please contact us.
          </Text>
        </ScrollView>
      </BottomSheet>
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
    marginTop: 20,
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
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: 20,
    zIndex: 10,
    paddingHorizontal: 30,
    paddingBottom: 60,
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
    elevation: 3,
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
  heading: {
    fontSize: 18,
    color: "#5d1889",
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default Welcome;
