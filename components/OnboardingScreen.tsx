import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";

interface OnboardingScreenProps {
  image: ImageSourcePropType;
  title: string;
  description: string;
  onNext: () => void;
  isLast: boolean;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <View style={styles.screen}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "65%",
    resizeMode: "cover",
    marginTop: -30,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#5d1889",
    width: "80%",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    width: "80%",
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
