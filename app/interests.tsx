import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { updateInterests, updateStoryPreferences } from "@/store/userSlice";
import MainLayout from "@/shared/MainLayout";
import Button from "@/components/ui/Button";
import { RootState } from "@/store";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const Interests: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userState = useSelector((state: RootState) => state.user);

  // Local states for form fields
  const [favoriteStoryGenre, setFavoriteStoryGenre] = useState(
    userState.interests.favoriteStoryGenre || ""
  );
  const [favoriteCharacter, setFavoriteCharacter] = useState(
    userState.interests.favoriteCharacter || ""
  );
  const [creativePreference, setCreativePreference] = useState(
    userState.interests.creativePreference || ""
  );
  const [favoriteColor, setFavoriteColor] = useState(
    userState.interests.favoriteColor || ""
  );
  const [mood, setMood] = useState(userState.storyPreferences.mood || "");
  const [themeOfInterest, setThemeOfInterest] = useState(
    userState.storyPreferences.themeOfInterest || ""
  );

  const colors = [
    { name: "Candy Red", value: "#FF0800" },
    { name: "Bubble Pink", value: "#FFC1CC" },
    { name: "Shine", value: "#FFD700" },
  ];

  // Select color
  const selectColor = (color: string) => {
    setFavoriteColor(color === favoriteColor ? "" : color);
  };

  const handleSave = () => {
    if (
      !favoriteStoryGenre ||
      !favoriteCharacter ||
      !creativePreference ||
      !favoriteColor ||
      !mood ||
      !themeOfInterest
    ) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    // Dispatch updated interests and story preferences to Redux
    dispatch(
      updateInterests({
        favoriteStoryGenre,
        favoriteCharacter,
        creativePreference,
        favoriteColor,
      })
    );
    dispatch(updateStoryPreferences({ mood, themeOfInterest }));

    Alert.alert("Success", "Your interests have been saved!");

    // Navigate to the Submit screen
    router.push("/upload-picture");
  };

  return (
    <MainLayout title="Interests">
      <View style={styles.content}>
        <Text style={styles.description}>Tell us about your interests</Text>
        <View style={styles.container}>
          <Text style={styles.label}>Favorite Story Genre</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={favoriteStoryGenre}
              onValueChange={setFavoriteStoryGenre}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="ADVENTURE" value="ADVENTURE" />
              <Picker.Item label="FANTASY" value="FANTASY" />
              <Picker.Item label="MYSTERY" value="MYSTERY" />
              <Picker.Item label="FOLKLORE" value="FOLKLORE" />
              <Picker.Item label="SCIENCE_FICTION" value="SCIENCE_FICTION" />
            </Picker>
          </View>

          <Text style={styles.label}>Favorite Character</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Spiderman"
            value={favoriteCharacter}
            onChangeText={setFavoriteCharacter}
          />

          <Text style={styles.label}>Creative Preference</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={creativePreference}
              onValueChange={setCreativePreference}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="READING" value="READING" />
              <Picker.Item label="WRITING" value="WRITING" />
              <Picker.Item label="DRAWING" value="DRAWING" />
            </Picker>
          </View>

          <Text style={styles.label}>Favorite Color</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color.name}
                style={[
                  styles.colorContainer,
                  favoriteColor === color.name && styles.colorSelected,
                ]}
                onPress={() => selectColor(color.name)}
              >
                <View
                  style={[styles.colorBlock, { backgroundColor: color.value }]}
                />
                <Text style={styles.colorName}>{color.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Mood</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={mood}
              onValueChange={setMood}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="FUNNY" value="FUNNY" />
              <Picker.Item label="SERIOUS" value="SERIOUS" />
              <Picker.Item label="EDUCATION" value="EDUCATION" />
              <Picker.Item label="LIGHT_HEARTED" value="LIGHT_HEARTED" />
            </Picker>
          </View>

          <Text style={styles.label}>Theme of Interest</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={themeOfInterest}
              onValueChange={setThemeOfInterest}
              style={styles.picker}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="FRIENDSHIP" value="FRIENDSHIP" />
              <Picker.Item label="MAGIC" value="MAGIC" />
              <Picker.Item label="PROBLEM_SOLVING" value="PROBLEM_SOLVING" />
              <Picker.Item label="CULTURE" value="CULTURE" />
              <Picker.Item label="ANIMALS" value="ANIMALS" />
              <Picker.Item label="OTHER" value="OTHER" />
            </Picker>
          </View>
        </View>

        <Button text="Save Interests" onPress={handleSave} absolute />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1 },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
  },
  container: {
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: { marginBottom: 4 },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 0.5,
    borderColor: "#000",
    borderRadius: 8,
    marginBottom: 10,
    height: 40,
    justifyContent: "center",
  },
  picker: { height: 50 },
  colorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  colorBlock: { height: 24, width: 24, borderRadius: 12 },
  colorName: { fontSize: 12, color: "#000" },
  colorSelected: { borderWidth: 2, borderColor: "#FFD700", padding: 2 },
});

export default Interests;
