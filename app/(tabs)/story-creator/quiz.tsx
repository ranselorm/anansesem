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
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { Colors, Fonts } from "@/theme";

const questions = [
  {
    id: 1,
    question: "Who was the first person to talk to the forest oracle?",
    options: [
      { text: "Ananse's son", isCorrect: true, alphabet: "A" },
      { text: "The hunter", isCorrect: false, alphabet: "B" },
      { text: "Ananse", isCorrect: false, alphabet: "C" },
    ],
  },
  {
    id: 2,
    question: "What object did Ananse keep all his wisdom in?",
    options: [
      { text: "A car", isCorrect: false, alphabet: "A" },
      { text: "A pot", isCorrect: true, alphabet: "B" },
      { text: "A dream catcher", isCorrect: false, alphabet: "C" },
    ],
  },
  {
    id: 3,
    question: "Why did Ananse lose all his wisdom?",
    options: [
      {
        text: "He spilled it",
        isCorrect: true,
        alphabet: "A",
      },
      { text: "He gave it away to his son", isCorrect: false, alphabet: "B" },
      { text: "The pot broke", isCorrect: false, alphabet: "C" },
    ],
  },
  {
    id: 4,
    question: "What was Ananse's primary motivation in his stories?",
    options: [
      { text: "To gain power", isCorrect: false, alphabet: "A" },
      { text: "To outwit others", isCorrect: true, alphabet: "B" },
      { text: "To spread knowledge", isCorrect: false, alphabet: "C" },
    ],
  },
  {
    id: 5,
    question: "What did Ananse often use to solve problems?",
    options: [
      { text: "His strength", isCorrect: false, alphabet: "A" },
      { text: "His cleverness", isCorrect: true, alphabet: "B" },
      { text: "His wealth", isCorrect: false, alphabet: "C" },
    ],
  },
];

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const handleOptionSelect = (index: number, isCorrect: boolean) => {
    setSelectedOption(index);
    if (isCorrect) setScore((prevScore) => prevScore + 1);
  };

  const handleNextOrSubmit = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null); // Reset selected option
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsQuizCompleted(false);
  };

  if (isQuizCompleted) {
    return (
      <View style={styles.content}>
        <Text style={styles.resultText}>Congratulations! You scored</Text>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.badge}>
          {score === questions.length
            ? "You unlocked the Science Genius Badge!"
            : "Great effort! Try again to unlock the badge!"}
        </Text>
        <TouchableOpacity
          style={styles.restartButton}
          onPress={handleRestartQuiz}
        >
          <Text style={styles.restartButtonText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.screen}>
      <View style={styles.media}>
        <Image
          source={require("../../../assets/images/story.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.question}>{currentQuestion.question}</Text>
        <FlatList
          data={currentQuestion.options}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.option,
                selectedOption === index && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(index, item.isCorrect)}
            >
              <View style={styles.span}>
                <Text style={styles.spanText}>{item.alphabet}</Text>
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
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextOrSubmit}
          disabled={selectedOption === null}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "#fff",
    marginTop: -30,
    borderRadius: 40,
    paddingVertical: 20,
    // alignItems: "",
    paddingHorizontal: 50,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: Fonts.heading,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
    fontSize: 16,
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
  nextButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#D0EE30",
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  score: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 16,
  },
  badge: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  restartButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#D0EE30",
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
