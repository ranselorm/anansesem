import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import MainLayout from "../../shared/MainLayout";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { updateBio } from "@/store/userSlice";
import Button from "@/components/ui/Button";

const CreateProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [language, setLanguage] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!username || !age || !grade || !language || !country) {
      alert("Please fill out all fields!");
      return;
    }

    dispatch(
      updateBio({
        fullName: username,
        // age,
        // grade,
        // language,
        // country,
      })
    );

    console.log({
      username,
      age,
      grade,
      language,
      country,
    });

    router.push("/know-you");
  };

  return (
    <View style={styles.screen}>
      <MainLayout title="Create your profile">
        <View style={styles.content}>
          <Text style={styles.description}>
            To customize your adventure, please tell us a little about yourself
          </Text>
          <Text>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={age}
              onValueChange={(itemValue) => setAge(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="What's your age?" value={null} />
              <Picker.Item label="<12" value="12" />
              <Picker.Item label="16-22" value="16-22" />
              <Picker.Item label="23+" value="23+" />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={grade}
              onValueChange={(itemValue) => setGrade(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="What's your class/grade?" value={null} />
              <Picker.Item label="Basic" value="basic" />
              <Picker.Item label="Intermediate" value="intermediate" />
              <Picker.Item label="Advanced" value="advanced" />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={language}
              onValueChange={(itemValue) => setLanguage(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a language" value={null} />
              <Picker.Item label="English" value="english" />
              <Picker.Item label="French" value="french" />
              <Picker.Item label="Spanish" value="spanish" />
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={country}
              onValueChange={(itemValue) => setCountry(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a country" value={null} />
              <Picker.Item label="United States" value="us" />
              <Picker.Item label="Canada" value="ca" />
              <Picker.Item label="United Kingdom" value="uk" />
            </Picker>
          </View>
        </View>
      </MainLayout>
      <Button text="Submit" onPress={handleSubmit} absolute />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    color: "#000",
    marginBottom: 50,
    marginTop: 50,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#C4A1FF",
    marginBottom: 30,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#FBCB46",
  },
  picker: {
    height: 50,
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

export default CreateProfile;