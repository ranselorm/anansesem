import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import MainLayout from "../shared/MainLayout";
import { router } from "expo-router";

const UploadProfilePicture: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handlePickImage = async () => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Please allow access to your photos.");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  };

  const handleSubmit = () => {
    // if (!profileImage) {
    //   Alert.alert("No Profile Picture", "Please select a profile picture.");
    //   return;
    // }

    console.log("Profile Image URI:", profileImage);
    // Proceed to the next screen logic
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.screen}>
      <MainLayout title="Upload a profile picture">
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholder}>
                <MaterialIcons name="person" size={80} color="#FFBB00" />
              </View>
            )}
            <TouchableOpacity
              activeOpacity={1.2}
              style={styles.addIconContainer}
              onPress={handlePickImage}
            >
              <MaterialIcons name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
          <MaterialIcons
            name="arrow-forward"
            size={22}
            color="white"
            style={styles.icon}
          />
        </TouchableOpacity>
      </MainLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imageContainer: {
    position: "relative",
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "#FBCB46",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
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
    bottom: 10,
    right: 6,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
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

export default UploadProfilePicture;
