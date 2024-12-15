import { useEvent } from "expo";

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Button,
} from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { Colors, FontSizes } from "@/theme";

const StoryPlayback: React.FC = () => {
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor={Colors.primary} barStyle="dark-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default StoryPlayback;
