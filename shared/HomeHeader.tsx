// shared/HomeHeader.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  title?: string;
  isIcon?: boolean;
}

const HomeHeader: React.FC<HeaderProps> = ({ title, isIcon = true }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isIcon && (
          <View style={styles.placeholder}>
            <MaterialIcons name="person" size={30} color="#FFBB00" />
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
        {/* Optional right icon or actions can be added here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomColor: "#ccc",
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5D1889",
    textAlign: "center",
    flex: 1,
  },

  placeholder: {
    height: 40,
    width: 40,
    borderRadius: 75,
    backgroundColor: "#FF8D6A",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeHeader;
