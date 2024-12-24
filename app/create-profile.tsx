import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MainLayout from "../shared/MainLayout";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { updateBio } from "@/store/userSlice";
import Button from "@/components/ui/Button";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateProfile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [language, setLanguage] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      !username ||
      !email ||
      !phone ||
      !dateOfBirth ||
      !age ||
      !grade ||
      !language ||
      !country
    ) {
      alert("Please fill out all fields!");
      return;
    }

    // Dispatch data to Redux
    dispatch(
      updateBio({
        fullName: username,
        email,
        phoneNumber: phone,
        dateOfBirth: dateOfBirth.toISOString(), // Convert Date object to ISO string
        // language,
        // country,
      })
    );

    console.log({
      username,
      email,
      phone,
      dateOfBirth: dateOfBirth.toISOString(),
      age,
      grade,
      language,
      country,
    });

    router.push("/know-you");
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false); // Hide the date picker
    if (selectedDate) {
      setDateOfBirth(selectedDate); // Update the state with selected date
    }
  };

  const formattedDate = dateOfBirth
    ? dateOfBirth.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Select Date of Birth";

  return (
    <View style={styles.screen}>
      <MainLayout title="Create your profile">
        <View style={styles.content}>
          <Text style={styles.description}>
            To customize your adventure, please tell us a little about yourself
          </Text>
          <View>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Jeremiah Cook"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. jerry@example.com"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
          <View>
            <Text style={styles.label}>Date of birth</Text>
            <TouchableOpacity
              style={styles.datePickerInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>{formattedDate}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                maximumDate={new Date()} // Prevent future dates
                onChange={handleDateChange}
              />
            )}
          </View>
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
  label: {
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#C4A1FF",
    marginBottom: 20,
  },
  datePickerInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: "#C4A1FF",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#000",
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
});

export default CreateProfile;
