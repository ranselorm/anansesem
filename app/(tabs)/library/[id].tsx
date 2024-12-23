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
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Fonts, FontSizes } from "@/theme";
import { useLocalSearchParams } from "expo-router";

const StoryPlayback: React.FC = () => {
  const { id } = useLocalSearchParams();
  console.log(id);

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.media}>
        <Image
          source={require("../../../assets/images/story.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Ananse and the pot of wisdom</Text>
        <View style={styles.info}>
          <Text style={styles.infoTime}>15mins</Text>
          <TouchableOpacity style={styles.infoSave}>
            <Text>Save to library</Text>
          </TouchableOpacity>
          <Text style={styles.category}>African forklore</Text>
          <Text style={styles.category2}>Egyptian tales</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            Ananse, the trickster spider, is always on the hunt for knowledge
            and power. When he hears of a magical pot filled with infinite
            wisdom, he sets out on a perilous quest. But the path to the pot is
            fraught with dangers and riddles. Can Ananse outwit his foes and
            claim the prize, or will his greed and cunning lead to his downfall?
          </Text>
        </View>
        <TouchableOpacity activeOpacity={1.0} style={styles.button}>
          <AntDesign name="download" size={20} color="black" />
          <Text style={styles.buttonText}>Download and save offline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  media: {
    height: 330,
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  content: {
    height: 420,
    backgroundColor: "#fff",
    marginTop: -30,
    borderRadius: 40,
    paddingVertical: 20,
    // alignItems: "",
    paddingHorizontal: 50,
  },
  title: {
    color: Colors.main,
    fontFamily: Fonts.heading,
    fontSize: FontSizes.medium,
    textAlign: "left",
  },

  info: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    flexWrap: "wrap",
    marginTop: 15,
  },

  infoTime: {
    borderRadius: 6,
    fontSize: FontSizes.small,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  infoSave: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    fontSize: FontSizes.small,
    backgroundColor: Colors.purple,
  },
  category: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    fontSize: FontSizes.small,
    // backgroundColor: Colors.purple,
  },
  category2: {
    borderWidth: 1,
    borderColor: Colors.pink,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    fontSize: FontSizes.small,
    // backgroundColor: Colors.purple,
  },

  body: {
    marginTop: 15,
  },

  bodyText: {
    fontSize: FontSizes.small,
    lineHeight: 19.5,
  },

  button: {
    backgroundColor: Colors.yellow,
    fontSize: FontSizes.small,
    padding: 10,
    borderRadius: 50,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    overflow: "hidden",
  },

  buttonText: {
    backgroundColor: Colors.yellow,
    fontSize: FontSizes.medium,
    textAlign: "center",
  },
});

export default StoryPlayback;
