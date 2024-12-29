import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MainLayout from "../shared/MainLayout";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "@/store/userSlice";
import Button from "@/components/ui/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/theme";
import * as ImagePicker from "expo-image-picker";
import { RootState } from "@/store";

const CreateProfile: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("");
  const [readingLevel, setReadingLevel] = useState("");
  const [avatar, setAvatar] = useState("");
  const [pending, setPending] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.userResponse);

  console.log(user?.token);

  const dispatch = useDispatch();

  const pickImageAsync = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const image = result.assets[0];
        const {
          uri,
          fileName = "default-image.jpg",
          mimeType = "image/jpeg",
        } = image;

        // formdata
        const formData = new FormData();
        formData.append("containerName", "profile");
        formData.append("reference", "random-string");
        formData.append("accessLevel", "blob");
        formData.append("file", {
          uri: uri,
          name: fileName,
          type: mimeType,
        } as any);

        setPending(true);
        const response = await fetch(
          "https://anansesem-dev-api.azurewebsites.net/api/upload",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(
            `Upload failed: ${response.status} - ${errorMessage}`
          );
        }

        const { data } = await response?.json();
        setAvatar(data.url);
      } else {
        Alert.alert("You did not select any image.");
      }
    } catch (error) {
      alert("An error occurred while selecting an image.");
    } finally {
      setPending(false);
    }
  };

  const handleSubmit = () => {
    if (
      !fullname ||
      !email ||
      !phone ||
      !dateOfBirth ||
      !gender ||
      !readingLevel ||
      !avatar
    ) {
      alert("Please fill out all fields including the picture!");
      return;
    }

    dispatch(
      updateBio({
        fullName: fullname,
        email,
        phoneNumber: phone,
        dateOfBirth: dateOfBirth.toISOString(),
        gender,
        readingLevel,
        avatar,
      })
    );

    router.push("/interests");
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const formattedDate = dateOfBirth
    ? dateOfBirth.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "dd/mm/yyyy";

  return (
    <View style={styles.screen}>
      <MainLayout title="Create your profile">
        <ScrollView style={{ paddingBottom: 60 }}>
          <View style={styles.content}>
            <Text style={styles.description}>
              To customize your adventure, please tell us a little about
              yourself
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <TouchableOpacity onPress={pickImageAsync} disabled={pending}>
                <View style={styles.imageContainer}>
                  <>
                    <View style={styles.placeholder}>
                      <MaterialIcons name="person" size={40} color="#FFBB00" />
                    </View>
                    {!avatar ? (
                      <Ionicons
                        name="add-circle"
                        size={30}
                        color="#5D1889"
                        style={styles.addIconContainer}
                      />
                    ) : (
                      <Ionicons
                        name="checkmark-done-circle"
                        size={30}
                        color="green"
                        style={styles.addIconContainer}
                      />
                    )}
                  </>
                </View>
              </TouchableOpacity>
              <Text>
                {!avatar
                  ? "Upload profile picture"
                  : "Profile picture uploaded!"}
              </Text>
              {pending && <ActivityIndicator size="small" color="#5D1889" />}
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.label}>Full name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Jeremiah Cook"
                value={fullname}
                onChangeText={setFullname}
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
                  maximumDate={new Date()}
                  onChange={handleDateChange}
                />
              )}
            </View>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select" value={null} />
                <Picker.Item label="FEMALE" value="FEMALE" />
                <Picker.Item label="MALE" value="MALE" />
              </Picker>
            </View>
            <Text style={styles.label}>Reading Level</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={readingLevel}
                onValueChange={(itemValue) => setReadingLevel(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select" value={null} />
                <Picker.Item label="Emergent" value="Emergent" />
                <Picker.Item label="Early Reader" value="Early Reader" />
                <Picker.Item label="Beginner" value="Beginner" />
                <Picker.Item
                  label="Transitional Reader"
                  value="Transitional Reader"
                />
                <Picker.Item label="Intermediate" value="Intermediate" />
                <Picker.Item label="Fluent Reader" value="Fluent Reader" />
                <Picker.Item label="Advanced" value="Advanced" />
              </Picker>
            </View>
          </View>
        </ScrollView>
      </MainLayout>
      <Button text="Next" onPress={handleSubmit} absolute />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "left",
    color: "#000",
    marginBottom: 20,
    // marginTop: 50,
  },

  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#FBCB46",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    height: "100%",
    width: "100%",
    borderRadius: 75,
    backgroundColor: "#FF8D6A",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    resizeMode: "cover",
  },
  addIconContainer: {
    position: "absolute",
    bottom: -2,
    right: -4,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginBottom: 2,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    paddingHorizontal: 15,
    backgroundColor: Colors.yellow,
    marginBottom: 10,
    color: "black",
  },
  datePickerInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: Colors.yellow,
    marginBottom: 10,
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
    backgroundColor: Colors.yellow,
    height: 40,
    justifyContent: "center",
  },
  picker: {
    height: 50,
    color: "#000",
  },
});

export default CreateProfile;
