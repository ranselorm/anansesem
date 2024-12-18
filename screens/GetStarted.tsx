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
    <View style={styles.screen}>
      <MainLayout title="Let’s get started">
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/icon/app-icon.png")}
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
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  imageContainer: {
    backgroundColor: "#C4A1FF",
    height: 200,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%",
    alignSelf: "center",
    marginTop: -60,
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
    marginTop: 40,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#FBCB46",
    marginTop: 40,
    width: "90%",
    alignSelf: "center",
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

export default GetStarted;
