import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import MainLayout from "../shared/MainLayout";

const GetStarted: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedRole) {
      alert("Please select a role to continue!");
      return;
    }
    console.log(`Selected Role: ${selectedRole}`);
    // Proceed to the next screen logic
  };

  return (
    <MainLayout title="Let’s get started">
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/logo-icon.png")}
            style={styles.image}
          />
        </View>
        <Text style={styles.description}>
          Anansesem is designed for both parent-supervised learning and
          independent exploration. Please select one of the options below.
        </Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedRole}
            onValueChange={(itemValue) => setSelectedRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select your role" value={null} />
            <Picker.Item label="Parent" value="parent" />
            <Picker.Item label="Child" value="child" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
          <MaterialIcons name="arrow-forward" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  imageContainer: {
    backgroundColor: "#C4A1FF",
    height: 200,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    alignSelf: "center",
  },
  image: {
    height: "100%",
    resizeMode: "contain",
    marginTop: 30,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 30,
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#FFF",
  },
  picker: {
    height: 50,
    color: "#000",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D0EE30",
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginRight: 10,
  },
});

export default GetStarted;
