import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HomeLayout from "@/shared/HomeLayout";
import ProfileLayout from "@/shared/ProfileLayout";
import { Colors, Fonts, FontSizes } from "@/theme";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearUserData } from "@/utils";

const settingsData = [
  { id: 1, label: "Audio settings", icon: "settings-voice" },
  { id: 2, label: "Language settings", icon: "language" },
  { id: 3, label: "Parental controls", icon: "child-care" },
  { id: 4, label: "Notifications", icon: "notifications" },
];

const Profile: React.FC = () => {
  return (
    <View style={styles.screen}>
      <ProfileLayout title="Profile" isIconLeft bgColor="#FFF3E0">
        <View style={styles.placeholder}>
          <MaterialIcons name="person" size={50} color="#FFBB00" />
        </View>
        <Text style={styles.title}>Elorm</Text>
        <Text style={styles.span}>
          <MaterialIcons name="star" />
          232
        </Text>

        <View style={styles.contentContainer}>
          <View style={styles.settingsList}>
            {settingsData.map((item) => (
              <SettingItem key={item.id} label={item.label} icon={item.icon} />
            ))}
          </View>
        </View>
      </ProfileLayout>
      <TouchableOpacity style={styles.footerButton} onPress={clearUserData}>
        <Text style={styles.footerText}>log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const SettingItem: React.FC<{ label: string; icon: string }> = ({
  label,
  icon,
}) => {
  return (
    <TouchableOpacity style={styles.settingItem} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        {/* <MaterialIcons name="settings" size={20} color="#A569BD" /> */}
      </View>
      <Text style={styles.settingLabel}>{label}</Text>
      <MaterialIcons name="chevron-right" size={24} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  placeholder: {
    height: 80,
    width: 80,
    borderRadius: 75,
    backgroundColor: "#FF8D6A",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  title: {
    alignItems: "center",
    textAlign: "center",
    fontSize: FontSizes.large,
    fontFamily: Fonts.heading,
    marginTop: 7,
    fontWeight: "bold",
  },
  span: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 5,
  },

  contentContainer: {
    backgroundColor: "white",
    paddingHorizontal: 40,
    marginTop: 40,
    height: "100%",
    borderRadius: 57,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cancelText: {
    fontSize: 16,
    color: "#A569BD",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5D1889",
  },
  settingsList: {
    marginVertical: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: "#E0E0E0",
  },
  iconContainer: {
    backgroundColor: "#F0E4F7",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  settingLabel: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  footerButton: {
    position: "absolute",
    backgroundColor: Colors.yellow,
    borderRadius: 50,
    paddingVertical: 15,
    bottom: 30,
    right: "20%",
    left: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#000",
    // fontWeight: "bold",
    textAlign: "center",
  },
});

export default Profile;
