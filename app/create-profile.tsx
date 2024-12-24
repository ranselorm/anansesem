import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MainLayout from "../shared/MainLayout";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { updateBio } from "@/store/userSlice";
import Button from "@/components/ui/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlZYYVpDdnozeEN2RXJwZFctQk5pNSJ9.eyJuYW1lIjoiR2lkZW9uIEJlZHpyYWgiLCJlbWFpbCI6ImdiZWR6cmFoMUBnbWFpbC5jb20iLCJpc3MiOiJodHRwczovL2FuYW5zZXNlbS51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8Njc2MDI0ZDBhOTE1ZmQ5MGMwZmMwZDI5IiwiYXVkIjpbImh0dHBzOi8vYW5hbnNlc2VtLWRldi1hcGkuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiaHR0cHM6Ly9hbmFuc2VzZW0udXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNTAzODM5NSwiZXhwIjoxNzM1MTI0Nzk1LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiaGZHaTJiWWdHeUxLSnBPSnFMT0hGNTl4c1FuMTdaTGEiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6Y29udGVudCIsImRlbGV0ZTpjb250ZW50IiwicmVhZDpjb250ZW50IiwicmVhZDp1c2VycyIsInVwZGF0ZTpjb250ZW50Il19.hykUgaIn0TUY-QjoR-IINratn-kjdqNAMgOwCv0xx8RQGfIP_pdzs9b3jYvi5TIugLxyVRzwyUiasHUq2rKTULDGyQGheH0nmAsoeozvhJ4dUCy68WzlUKMlZg8R5j03H_XhrTEjxNSxBCUce7cj_hRvm_PCGFBJpRz5hHStM7Mh3GHbrExNLXUdA56sBXpHMJ5VpaO5Co4TsgcNofy8YWy2xUHdoxKivSDkFV_Afq9SBYGMK41IcmfWMFb1yvcaLU0VMwTltll7ctfTOpMtcDvuRNGIm8gWZT3ol7GI3jwu3xyaPDvRwwPxOwZCU06IcW_ef5SUh0TNV74krOuF4w";

const CreateProfile: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("");
  const [readingLevel, setReadingLevel] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      !fullname ||
      !email ||
      !phone ||
      !dateOfBirth ||
      !gender ||
      !readingLevel
    ) {
      alert("Please fill out all fields!");
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
        avatar:
          "https://anansesemstoragedev.blob.core.windows.net/profile/random-string/ananse-read.png",
      })
    );

    console.log({
      fullname,
      email,
      phone,
      dateOfBirth: dateOfBirth.toISOString(),
      gender,
      readingLevel,
    });

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

  const pickImageAsync = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        console.log("Selected Image URI:", imageUri);

        // Fetch the file to ensure it's valid
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Prepare the FormData object
        const formData = new FormData();
        formData.append("containerName", "profile");
        formData.append("reference", "random-string"); // Use a proper reference
        formData.append("accessLevel", "blob");
        formData.append("file", blob, "uploaded-image.jpg"); // Append Blob

        console.log("FormData ready for upload.");

        // Upload the file
        const uploadResponse = await fetch(
          "https://anansesem-dev-api.azurewebsites.net/api/upload",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${TOKEN}`, // Use your token
            },
            body: formData,
          }
        );

        const uploadResult = await uploadResponse.json();

        if (uploadResponse.ok) {
          console.log("Upload successful:", uploadResult);
          Alert.alert("Success", "Image uploaded successfully!");
        } else {
          console.error("Upload failed:", uploadResult);
          Alert.alert(
            "Error",
            uploadResult.message || "Failed to upload the image."
          );
        }
      } else {
        Alert.alert("No Image Selected", "You did not select any image.");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
      Alert.alert("Error", "Something went wrong during the upload.");
    }
  };

  return (
    <View style={styles.screen}>
      <MainLayout title="Create your profile">
        <View style={styles.content}>
          <Text style={styles.description}>
            To customize your adventure, please tell us a little about yourself
          </Text>
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View style={styles.imageContainer}>
              <View style={styles.placeholder}>
                <MaterialIcons name="person" size={40} color="#FFBB00" />
              </View>

              <TouchableOpacity
                activeOpacity={1.2}
                style={styles.addIconContainer}
                onPress={pickImageAsync}
              >
                <MaterialIcons name="add" size={15} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Text>Upload profile picture</Text>
          </View>
          <View>
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
    // paddingHorizontal: 30,
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
    borderRadius: 75,
    backgroundColor: "#FBCB46",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
    borderRadius: 75,
    resizeMode: "cover",
  },
  addIconContainer: {
    position: "absolute",
    bottom: 4,
    right: 2,
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: "#000",
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
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    color: "black",
  },
  datePickerInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    height: 40,
    justifyContent: "center",
  },
  picker: {
    height: 50,
    color: "#000",
  },
});

export default CreateProfile;
