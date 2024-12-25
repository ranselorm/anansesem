import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { MaterialIcons, Entypo, FontAwesome6 } from "@expo/vector-icons";
import { Colors, Fonts, FontSizes } from "@/theme";
import Button from "@/components/ui/Button";
import { router, useLocalSearchParams } from "expo-router";

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Fetching questions from route parameters
  const { questions } = useLocalSearchParams<{ questions: string }>();
  const parsedQuestions = questions ? JSON.parse(questions) : [];

  const handleOptionSelect = (index: number, isCorrect: boolean) => {
    setSelectedOption(index);
    if (isCorrect) setScore((prevScore) => prevScore + 1);
  };

  const handleNextOrSubmit = () => {
    if (currentQuestionIndex < parsedQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null); // Reset selected option
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleDismiss = () => {
    router.replace("/(tabs)/library");
  };

  const renderScore = () => {
    return (
      <View style={styles.content}>
        <Text
          style={{
            textAlign: "center",
            fontSize: FontSizes.large,
            fontFamily: Fonts.heading,
          }}
        >
          Congratulations!
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: FontSizes.large,
            fontFamily: Fonts.heading,
          }}
        >
          You scored
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Image
            source={require("../../../assets/icons/star8.png")}
            style={{ width: 40, height: 40, marginTop: 50 }}
          />
          <Text style={styles.score}>{score}</Text>
        </View>
        <Text style={styles.badge}>
          {score === parsedQuestions.length
            ? "You unlocked the Science Genius Badge!"
            : "Great effort! Try again to unlock the badge!"}
        </Text>
        <Button text="Dismiss" absolute onPress={handleDismiss} />
      </View>
    );
  };

  const renderQuestions = () => {
    const currentQuestion = parsedQuestions[currentQuestionIndex];
    return (
      <View style={styles.content}>
        <Text style={styles.question}>{currentQuestion?.question}</Text>
        <FlatList
          data={currentQuestion.options}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.option,
                selectedOption === index && styles.selectedOption,
              ]}
              onPress={() =>
                handleOptionSelect(index, currentQuestion.answer === item.text)
              }
            >
              <View style={styles.span}>
                <Text style={styles.spanText}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={styles.optionText}>{item.text}</Text>
              {selectedOption === index ? (
                <MaterialIcons
                  name="check-circle"
                  size={24}
                  color="#000"
                  style={styles.checkIcon}
                />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={[styles.buttonWrapper]}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedOption === null && styles.disabledNextButton,
            ]}
            activeOpacity={0.9}
            onPress={handleNextOrSubmit}
            disabled={selectedOption === null} // Disable button if no option selected
          >
            <Text style={styles.buttonText}>
              {currentQuestionIndex === parsedQuestions.length - 1
                ? "Submit"
                : "Next"}
            </Text>
            <FontAwesome6 name="circle-arrow-right" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.media}>
        <Image
          source={require("../../../assets/images/story.png")}
          style={styles.image}
        />
      </View>

      {isQuizCompleted ? renderScore() : renderQuestions()}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  media: {
    height: 330,
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  content: {
    height: 420,
    backgroundColor: "#FFF3E0",
    marginTop: -30,
    borderRadius: 40,
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  question: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: Fonts.heading,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 7,
    paddingVertical: 10,
    marginVertical: 8,
    borderRadius: 50,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000",
  },
  selectedOption: {
    backgroundColor: Colors.purple,
  },
  optionText: {
    fontSize: 14,
    color: "#000",
  },
  span: {
    backgroundColor: "#000",
    width: 25,
    height: 25,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  spanText: {
    color: "white",
  },
  checkIcon: {
    marginLeft: 8,
  },
  score: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#442359",
    marginLeft: 15,
    marginTop: 50,
  },
  badge: {
    fontSize: FontSizes.medium,
    textAlign: "center",
    marginBottom: 30,
  },
  disabledNextButton: {
    backgroundColor: "gray", // Gray out the button when disabled
  },
  buttonWrapper: {
    backgroundColor: "#000",
    borderRadius: 15,
    paddingRight: 2,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#CCFF33",
    borderRadius: 15,
    width: 260,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 30,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
});
