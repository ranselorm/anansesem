import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import HomeLayout from "../../shared/HomeLayout";
import { Colors, FontSizes } from "@/theme";

const StoryCreator: React.FC = () => {
  const [characters, setCharacters] = useState<string | null>("one");
  const [voice, setVoice] = useState<string | null>("Julia (female)");
  const [duration, setDuration] = useState<string | null>("5mins");
  const [genre, setGenre] = useState<string | null>("Science");
  const [title, setTitle] = useState<string>("");

  const handleGenerateStory = () => {
    if (!title) {
      alert("Please provide a story title!");
      return;
    }
    console.log({
      characters,
      voice,
      duration,
      genre,
      title,
    });
    // Proceed with the story generation logic
  };

  const [visible, setVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const startLoading = () => {
    setVisible(true);
    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
        setVisible(false);
      } else {
        progress += 10;
        setPercentage(progress);
      }
    }, 500);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.screen}>
            <HomeLayout title="AI Story Creator" isIcon>
              <View style={styles.content}>
                {/* Characters */}
                <View style={styles.row}>
                  <Text style={styles.label}>Characters</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={characters}
                      onValueChange={(value) => setCharacters(value)}
                      style={styles.picker}
                    >
                      <Picker.Item label="One" value="one" />
                      <Picker.Item label="Two" value="two" />
                      <Picker.Item label="Multiple" value="multiple" />
                    </Picker>
                  </View>
                </View>

                {/* Voice */}
                <View style={styles.row}>
                  <Text style={styles.label}>Voice</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={voice}
                      onValueChange={(value) => setVoice(value)}
                      style={styles.picker}
                    >
                      <Picker.Item
                        label="Julia (female)"
                        value="Julia (female)"
                      />
                      <Picker.Item label="Mark (male)" value="Mark (male)" />
                      <Picker.Item
                        label="Sophia (female)"
                        value="Sophia (female)"
                      />
                    </Picker>
                  </View>
                </View>

                {/* Duration */}
                <View style={styles.row}>
                  <Text style={styles.label}>Duration</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={duration}
                      onValueChange={(value) => setDuration(value)}
                      style={styles.picker}
                    >
                      <Picker.Item label="5mins" value="5mins" />
                      <Picker.Item label="10mins" value="10mins" />
                      <Picker.Item label="15mins" value="15mins" />
                    </Picker>
                  </View>
                </View>

                {/* Genre */}
                <View style={styles.row}>
                  <Text style={styles.label}>Genre</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={genre}
                      onValueChange={(value) => setGenre(value)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Science" value="Science" />
                      <Picker.Item label="Folklore" value="Folklore" />
                      <Picker.Item label="Adventure" value="Adventure" />
                    </Picker>
                  </View>
                </View>

                {/* Upload Picture */}
                <View style={styles.uploadContainer}>
                  <Text style={styles.uploadText}>
                    Upload picture reference (optional)
                  </Text>
                  <TouchableOpacity style={styles.uploadButton}>
                    <Entypo name="circle-with-plus" size={40} color="black" />
                  </TouchableOpacity>
                </View>

                {/* Story Title */}
                <TextInput
                  style={styles.input}
                  placeholder="Type your title here"
                  placeholderTextColor="#000"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </HomeLayout>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.button} onPress={handleGenerateStory}>
        <Text style={styles.buttonText}>Submit</Text>
        <MaterialIcons
          name="arrow-forward"
          size={22}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontSize: FontSizes.medium,
    color: "#000",
  },
  pickerContainer: {
    flex: 2,
    overflow: "hidden",
    backgroundColor: "#D9D9D9",
    height: 30,
    justifyContent: "center",
  },
  picker: {
    color: "#000",
  },
  uploadContainer: {
    width: "100%",
    height: 130,
    padding: 20,
    backgroundColor: Colors.primary,
    marginTop: 30,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  uploadButton: {
    alignItems: "center",
    marginTop: 15,
  },
  uploadText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: Colors.primary,
    marginTop: 30,
    fontSize: 16,
  },
  button: {
    position: "absolute",
    bottom: 10,
    left: "20%",
    right: "20%",
    backgroundColor: "#D0EE30",
    paddingVertical: 10,
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

export default StoryCreator;
