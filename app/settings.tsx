import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ProfileLayout from "@/shared/ProfileLayout";
import { Colors, Fonts, FontSizes } from "@/theme";

const settingsData = [
  { id: 1, label: "Audio settings" },
  { id: 2, label: "Language settings" },
  { id: 3, label: "Parental controls" },
  { id: 4, label: "Notifications" },
  { id: 5, label: "Privacy and security" },
  { id: 6, label: "Subscriptions" },
  { id: 7, label: "Help/Support" },
];

const Settings: React.FC = () => {
  return (
    <View style={styles.screen}>
      <ProfileLayout title="Settings" bgColor="#FFF3E0">
        <View style={styles.contentContainer}>
          <View style={styles.settingsList}>
            {settingsData.map((item) => (
              <SettingItem key={item.id} label={item.label} />
            ))}
          </View>
        </View>
      </ProfileLayout>
      <TouchableOpacity style={styles.footerButton}>
        <Text style={styles.footerText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const SettingItem: React.FC<{ label: string; icon?: string }> = ({
  label,
  icon,
}) => {
  return (
    <TouchableOpacity style={styles.settingItem} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        {/* <MaterialIcons name="settings" size={20} color="#A569BD" /> */}
      </View>
      <Text style={styles.settingLabel}>{label}</Text>
      {label === "Notifications" ? (
        <MaterialCommunityIcons
          name="toggle-switch-off-outline"
          size={24}
          color="black"
        />
      ) : (
        <MaterialIcons name="chevron-right" size={24} color="#000" />
      )}
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
    paddingHorizontal: 30,
    marginTop: -85,
    height: "120%",
    borderRadius: 57,
    paddingTop: 80,
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
  },
  footerText: {
    fontSize: 16,
    color: "#000",
    // fontWeight: "bold",
    textAlign: "center",
  },
});

export default Settings;
