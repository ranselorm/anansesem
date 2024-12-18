import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import MainLayout from "../shared/MainLayout";
import { FontSizes } from "@/theme";

interface Profile {
  id: string;
  name: string;
  color: string;
}
const profiles: Profile[] = [
  { id: "1", name: "Elorm", color: "#4CAF50" },
  { id: "2", name: "Joey", color: "#09A4B2" },
  { id: "3", name: "Ama", color: "#FF8D6A" },
  { id: "4", name: "Yaa", color: "#C4A1FF" },
];

const SelectProfile: React.FC = () => {
  return (
    <View style={styles.screen}>
      <MainLayout title="Select your profile">
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/icon/app-icon.png")}
              style={styles.image}
            />
          </View>
          <Text style={styles.description}>
            To customize your adventure, please tell us a little about yourself
          </Text>
          <View style={styles.profileContainer}>
            {profiles &&
              profiles.map((profile) => (
                <View
                  style={[
                    styles.placeholder,
                    { backgroundColor: profile.color },
                  ]}
                  key={profile.id}
                >
                  <MaterialIcons
                    name="person"
                    size={70}
                    color="#FFBB00"
                    style={styles.profileIcon}
                  />
                </View>
              ))}
          </View>
        </View>
      </MainLayout>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add profile</Text>
        <MaterialIcons
          name="arrow-forward"
          size={22}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
  },
  imageContainer: {
    backgroundColor: "#C4A1FF",
    height: 60,
    width: 60,
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
    fontSize: FontSizes.medium,
    textAlign: "center",
    marginTop: 20,
  },

  profileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },

  placeholder: {
    height: 100,
    width: 100,
    borderRadius: 75,
    backgroundColor: "#FF8D6A",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 12,
    marginBottom: 30,
  },
  profileIcon: {},

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

export default SelectProfile;
