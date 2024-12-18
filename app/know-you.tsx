import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MainLayout from "../shared/MainLayout";
import { router } from "expo-router";
import Button from "@/components/ui/Button";

// Generate a random color
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface TagOption {
  label: string;
  isSelected: boolean;
  borderColor: string;
}

const GetToKnowYou: React.FC = () => {
  const [storyGenres, setStoryGenres] = useState<TagOption[]>([]);
  const [learningStyles, setLearningStyles] = useState<TagOption[]>([]);
  const [characterPreferences, setCharacterPreferences] = useState<TagOption[]>(
    []
  );

  useEffect(() => {
    setStoryGenres([
      {
        label: "African folklore",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Egyptian tales",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Myths and legends",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Alien worlds",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Comedy",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Science",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Fairy tales",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Ancient civilizations",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "History",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
    ]);

    setLearningStyles([
      {
        label: "Visual",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Kinesthetic",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Logical",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      { label: "Audio", isSelected: false, borderColor: generateRandomColor() },
      {
        label: "Special needs",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Informational",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Linguistic",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
    ]);

    setCharacterPreferences([
      {
        label: "Superheroes",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Animals",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Ananse",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Female characters",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      {
        label: "Male characters",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
      { label: "Gods", isSelected: false, borderColor: generateRandomColor() },
      {
        label: "Magical Creatures",
        isSelected: false,
        borderColor: generateRandomColor(),
      },
    ]);
  }, []);

  const handleTagToggle = (
    tags: TagOption[],
    setTags: React.Dispatch<React.SetStateAction<TagOption[]>>,
    label: string
  ) => {
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag.label === label ? { ...tag, isSelected: !tag.isSelected } : tag
      )
    );
  };

  const handleSubmit = () => {
    const selectedGenres = storyGenres
      .filter((tag) => tag.isSelected)
      .map((tag) => tag.label);

    const selectedLearningStyles = learningStyles
      .filter((tag) => tag.isSelected)
      .map((tag) => tag.label);

    const selectedPreferences = characterPreferences
      .filter((tag) => tag.isSelected)
      .map((tag) => tag.label);

    if (
      !selectedGenres.length ||
      !selectedLearningStyles.length ||
      !selectedPreferences.length
    ) {
      alert("Please select at least one option in each category!");
      return;
    }

    console.log({
      storyGenres: selectedGenres,
      learningStyles: selectedLearningStyles,
      characterPreferences: selectedPreferences,
    });
    // Navigate to the next screen or handle the logic
    router.push("/upload-picture");
  };

  const renderTags = (
    tags: TagOption[],
    setTags: React.Dispatch<React.SetStateAction<TagOption[]>>
  ) => {
    return (
      <View style={styles.tagContainer}>
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag.label}
            style={[
              styles.tag,
              { borderColor: tag.borderColor },
              tag.isSelected && styles.tagSelected,
            ]}
            onPress={() => handleTagToggle(tags, setTags, tag.label)}
          >
            <Text
              style={[styles.tagText, tag.isSelected && styles.tagTextSelected]}
            >
              {tag.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <MainLayout title="Let’s get to know you">
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>
            What Story Genres do you like?
          </Text>
          {renderTags(storyGenres, setStoryGenres)}

          <Text style={styles.sectionTitle}>What is your learning style?</Text>
          {renderTags(learningStyles, setLearningStyles)}

          <Text style={styles.sectionTitle}>
            What are your character preferences?
          </Text>
          {renderTags(characterPreferences, setCharacterPreferences)}
        </ScrollView>
        {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
          <MaterialIcons
            name="arrow-forward"
            size={22}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity> */}
        <Button text="Submit" onPress={handleSubmit} absolute />
      </MainLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
    paddingHorizontal: 30,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#000",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: "#FFF",
    marginRight: 8,
    marginBottom: 8,
  },
  tagSelected: {
    backgroundColor: "#C4A1FF",
  },
  tagText: {
    color: "#000",
    fontSize: 12,
  },
  tagTextSelected: {
    color: "#000",
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
});

export default GetToKnowYou;
