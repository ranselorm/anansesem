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
import { FontSizes } from "@/theme";

interface HeaderProps {
  title?: string;
  isIcon?: boolean;
  isIconLeft?: boolean;
}

const HomeHeader: React.FC<HeaderProps> = ({
  title,
  isIcon = true,
  isIconLeft,
}) => {
  // const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isIcon ? (
          <View style={styles.placeholder}>
            <MaterialIcons name="person" size={30} color="#FFBB00" />
          </View>
        ) : (
          <Text style={{ opacity: 1 }}>Cancel</Text>
        )}
        <Text style={styles.title}>{title}</Text>
        {isIconLeft ? (
          <MaterialIcons name="settings" size={24} />
        ) : (
          <Text style={{ opacity: 1 }}>Done</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "transparent",
    zIndex: 99999,
  },
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomColor: "#ccc",
  },

  title: {
    fontSize: FontSizes.title,
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
