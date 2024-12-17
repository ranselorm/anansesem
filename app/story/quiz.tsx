import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const quizData = [
  {
    question: "Who was the first person to talk to the forest oracle?",
    options: [
      { text: "Ananse's son", isCorrect: true },
      { text: "The hunter", isCorrect: false },
      { text: "Ananse", isCorrect: false },
    ],
  },
  {
    question: "What object did Ananse keep all his wisdom in?",
    options: [
      { text: "A car", isCorrect: false },
      { text: "A pot", isCorrect: true },
      { text: "A dream catcher", isCorrect: false },
    ],
  },
];

const QuizUI: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScoreScreen, setShowScoreScreen] = useState(false);

  const handleOptionPress = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowScoreScreen(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScoreScreen(false);
  };

  if (showScoreScreen) {
    return (
      <View style={styles.container}>
        <Text style={styles.scoreHeader}>Congratulations!</Text>
        <Text style={styles.scoreText}>You scored</Text>
        <Text style={styles.scoreValue}>{score * 10}</Text>
        <TouchableOpacity style={styles.button} onPress={resetQuiz}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      <FlatList
        data={currentQuestion.options}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionPress(item.isCorrect)}
          >
            <Text style={styles.optionText}>{item.text}</Text>
            {item.isCorrect ? (
              <MaterialIcons name="check-circle" size={24} color="green" />
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                size={24}
                color="#000"
              />
            )}
          </TouchableOpacity>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Question {currentQuestionIndex + 1} of {quizData.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
  scoreHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#5D1889",
  },
  scoreText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
    color: "#000",
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFD700",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#5D1889",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default QuizUI;
