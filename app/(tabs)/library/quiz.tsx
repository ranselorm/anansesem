import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts, FontSizes } from "@/theme";
import { router, useLocalSearchParams } from "expo-router";

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Fetching questions from route parameters
  const { questions, title } = useLocalSearchParams<{
    questions: string;
    title: string;
  }>();
  const parsedQuestions = questions ? JSON.parse(questions) : [];

  // Animated progress bar setup
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Reset state when a new quiz starts
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsQuizCompleted(false);

    Animated.timing(progressAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [questions]);

  useEffect(() => {
    // Animate progress when the question index changes
    const progress = currentQuestionIndex / parsedQuestions.length;
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 500, // Duration for smooth transition
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [currentQuestionIndex]);

  const handleOptionSelect = (index: number, isCorrect: boolean) => {
    setSelectedOption(index);
    if (isCorrect) setScore((prevScore) => prevScore + 1);

    // Automatically move to the next question or show the score screen
    setTimeout(() => {
      if (currentQuestionIndex < parsedQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null);
      } else {
        setIsQuizCompleted(true);
      }
    }, 1000);
  };

  const renderProgressBar = () => {
    const progress = isQuizCompleted
      ? 1 // Full progress if the quiz is completed
      : currentQuestionIndex / parsedQuestions.length;

    const width: any = progress * 100 + "%"; // Convert progress to percentage

    return (
      <View style={styles.progressBarWrapper}>
        <Animated.View style={[styles.progressBar, { width }]} />
      </View>
    );
  };

  const currentQuestion = parsedQuestions[currentQuestionIndex];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title ? title : "Untitled story"}</Text>
          <Ionicons
            name="close-circle"
            size={20}
            color="black"
            onPress={() => router.back()}
          />
        </View>
        {renderProgressBar()}
        <View style={styles.questionWrapper}>
          <Text style={styles.question}>{currentQuestion?.question}</Text>
        </View>
        <Text style={{ textAlign: "center", marginVertical: 8, fontSize: 15 }}>
          Select an answer below
        </Text>
      </View>
      <View style={styles.answersWrapper}>
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
              <Text
                style={[
                  styles.optionText,
                  selectedOption === index && styles.selectedOptionText,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      {isQuizCompleted && (
        <View style={styles.scoreButton}>
          <Text style={styles.scoreText}>Score: {score} pts</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    height: 100,
    paddingTop: 40,
    marginBottom: 40,
  },
  titleContainer: {
    flexDirection: "row",
    marginHorizontal: 8,
    justifyContent: "space-between",
  },
  title: { fontSize: 14, color: Colors.main },
  progressBarWrapper: {
    height: 7,
    width: "93%",
    backgroundColor: "#e0e0e0",
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: Colors.main,
    borderRadius: 50,
  },
  questionWrapper: {
    backgroundColor: Colors.main,
    height: 150,
    width: "100%",
    marginTop: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  answersWrapper: {
    marginTop: 160,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: Fonts.heading,
    textAlign: "center",
    color: "white",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.purple,
    gap: 20,
    height: 70,
  },
  selectedOption: {
    backgroundColor: Colors.main,
    color: "#fff",
  },
  selectedOptionText: {
    color: "#fff",
  },
  optionText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "900",
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
  scoreButton: {
    backgroundColor: "#aa0000",
    padding: 8,
    width: 160,
    alignSelf: "center",
    marginTop: 15,
  },
  scoreText: {
    color: "white",
    textAlign: "center",
  },
});
