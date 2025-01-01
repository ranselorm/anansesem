import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { updateBio } from "@/store/userSlice";
import Button from "@/components/ui/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/theme";
import { useNickname } from "@/hooks/useNickname";
import * as ImagePicker from "expo-image-picker";

const CreateProfile: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [selectedNickname, setSelectedNickname] = useState<string | null>(null);
  const [nicknames, setNicknames] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("");
  const [readingLevel, setReadingLevel] = useState("");
  const [avatar, setAvatar] = useState("");
  const [pending, setPending] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { data: nicknameSuggestions, isLoading: isLoadingNicknames } =
    useNickname(fullname);

  useEffect(() => {
    if (nicknameSuggestions) {
      setNicknames(nicknameSuggestions);
    }
  }, [nicknameSuggestions]);

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

        console.log("Upload Successful:", data.url);
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
      !phone ||
      !dateOfBirth ||
      !gender ||
      !readingLevel ||
      !avatar ||
      !selectedNickname
    ) {
      alert("Please fill out all fields!");
      return;
    }

    dispatch(
      updateBio({
        fullName: fullname,
        phoneNumber: phone,
        dateOfBirth: dateOfBirth.toISOString(),
        gender,
        readingLevel,
        avatar,
        nickName: selectedNickname,
      })
    );
    router.push("/interests");
  };

  // const pickImageAsync = async () => {
  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       const image = result.assets[0];
  //       const formData = new FormData();
  //       formData.append("file", {
  //         uri: image.uri,
  //         name: "profile-picture.jpg",
  //         type: "image/jpeg",
  //       } as any);

  //       setPending(true);

  //       const response = await fetch(
  //         "https://anansesem-dev-api.azurewebsites.net/api/upload",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //           body: formData,
  //         }
  //       );

  //       if (!response.ok) {
  //         const errorMessage = await response.text();
  //         throw new Error(
  //           `Upload failed: ${response.status} - ${errorMessage}`
  //         );
  //       }

  //       const { data } = await response.json();
  //       setAvatar(data.url);
  //       Alert.alert("Success", "Profile picture uploaded successfully!");
  //     }
  //   } catch (error) {
  //     Alert.alert("Error", "An error occurred while uploading the picture.");
  //   } finally {
  //     setPending(false);
  //   }
  // };

  return (
    <View style={styles.screen}>
      <MainLayout title="Create your profile">
        <ScrollView style={{ paddingBottom: 60 }}>
          <View style={styles.content}>
            <Text style={styles.description}>
              To customize your adventure, please tell us a little about
              yourself
            </Text>
            <TouchableOpacity onPress={pickImageAsync} disabled={pending}>
              <View style={styles.imageContainer}>
                <MaterialIcons name="person" size={50} color="#FFBB00" />
                {avatar ? (
                  <Ionicons
                    name="checkmark-done-circle"
                    size={30}
                    color="green"
                    style={styles.addIconContainer}
                  />
                ) : (
                  <Ionicons
                    name="add-circle"
                    size={30}
                    color="#5D1889"
                    style={styles.addIconContainer}
                  />
                )}
              </View>
            </TouchableOpacity>
            <View>
              <Text style={styles.label}>Full name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Jeremiah Cook"
                value={fullname}
                onChangeText={setFullname}
              />
              {isLoadingNicknames ? (
                <ActivityIndicator size="small" color="#5D1889" />
              ) : (
                nicknames.length > 0 && (
                  <View style={styles.suggestionsContainer}>
                    <View style={styles.row}>
                      <Text style={styles.suggestionsLabel}>
                        Here are some suggestions
                      </Text>
                      <Ionicons
                        name="sparkles-outline"
                        color={Colors.main}
                        size={16}
                      />
                    </View>

                    <View style={styles.nickContainer}>
                      {nicknames.map((nickname) => (
                        <TouchableOpacity
                          key={nickname}
                          style={[
                            styles.suggestionItem,
                            selectedNickname === nickname &&
                              styles.selectedItem,
                          ]}
                          onPress={() => setSelectedNickname(nickname)}
                        >
                          <Text>{nickname}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )
              )}
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
        <Button text="Next" onPress={handleSubmit} />
      </MainLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 10 },
  description: {
    fontSize: 16,
    textAlign: "left",
    color: "#000",
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: 10,
    paddingHorizontal: 10,
  },
  addIconContainer: {
    position: "absolute",
    bottom: 2,
    right: 140,
  },
  suggestionsContainer: { marginVertical: 4 },
  row: {
    flexDirection: "row",
    paddingHorizontal: 2,
    justifyContent: "space-between",
  },
  suggestionsLabel: { fontSize: 12 },
  nickContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  suggestionItem: {
    marginVertical: 5,
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  selectedItem: { backgroundColor: Colors.yellow, fontWeight: 900 },
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
  dateText: { fontSize: 16, color: "#000" },
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
  picker: { height: 50, color: "#000" },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    paddingHorizontal: 15,
    backgroundColor: Colors.yellow,
    marginBottom: 25,
    color: "black",
  },

  label: {
    marginBottom: 2,
  },
});

export default CreateProfile;
