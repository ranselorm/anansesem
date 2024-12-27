import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import {
  MaterialIcons,
  Entypo,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { Colors, Fonts, FontSizes } from "@/theme";
import Button from "@/components/ui/Button";
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

  console.log(title && title);

  const handleOptionSelect = (index: number, isCorrect: boolean) => {
    setSelectedOption(index);
    if (isCorrect) setScore((prevScore) => prevScore + 1);

    // Automatically move to the next question after selecting an option
    setTimeout(() => {
      if (currentQuestionIndex < parsedQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOption(null); // Reset selected option
      } else {
        setIsQuizCompleted(true); // Quiz completed
      }
    }, 1000); // Delay for better UX
  };

  const handleDismiss = () => {
    router.replace("/(tabs)/library");
  };

  const renderProgressBar = () => {
    const progress = (currentQuestionIndex / parsedQuestions.length) * 100; // Progress starts at 0%
    return (
      <View style={styles.progressBarWrapper}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    );
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
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title ? title : "Untitled story"}</Text>
          <Ionicons name="close-circle" size={20} color="black" />
        </View>
        {renderProgressBar()}
      </View>

      {isQuizCompleted ? renderScore() : renderQuestions()}
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
    marginHorizontal: 10,
    justifyContent: "space-between",
    backgroundColor: "red",
  },
  title: { fontSize: 14, color: Colors.main },
  progressBarWrapper: {
    height: 5,
    width: "93%",
    backgroundColor: "#e0e0e0",
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: Colors.main,
    borderRadius: 10,
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
});
