import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";

import Button from "@/components/ui/Button";

import { useNavigation } from "expo-router";
import OnboardingScreen from "../components/OnboardingScreen";
import OnboardingDots from "../components/OnboardingDots";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    image: require("../assets/images/onboarding1.png"),
    title: "Welcome to your storybook world",
    description: "Let's embark on a magical journey together!",
  },
  {
    image: require("../assets/images/onboard2.png"),
    title: "Create your own adventures",
    description: "Unleash your creativity and create your own stories.",
  },
  {
    image: require("../assets/images/onboard3.png"),
    title: "Learn while you play",
    description: "Fun educational stories to spark your curiosity.",
  },
  {
    image: require("../assets/images/onboard4.png"),
    title: "A world of stories awaits you",
    description: "Dive into a vast library of exciting tales.",
  },
];

interface OnboardingContainerProps {
  onFinish: () => void;
}

const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
  onFinish,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onFinish();
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={{ width }}>
      <OnboardingScreen
        image={item.image}
        title={item.title}
        description={item.description}
        onNext={handleNext}
        isLast={false}
      />
    </View>
  );

  return (
    <View style={styles.screen}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1 }}
        />
        <OnboardingDots
          total={onboardingData.length}
          activeIndex={currentIndex}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNext}
        activeOpacity={1.2}
      >
        <Text style={styles.buttonText}>
          {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
        </Text>
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
    alignItems: "center",
    backgroundColor: "white",
  },
  container: {},
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

export default OnboardingContainer;
