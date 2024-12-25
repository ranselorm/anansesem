import { useEvent } from "expo";

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Fonts, FontSizes } from "@/theme";
import { useLocalSearchParams, Link, router } from "expo-router";
import { useFetchDetails } from "@/hooks/useFetchDetails";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import Spinner from "react-native-loading-spinner-overlay";
// import Button from "@/components/ui/Button";

const StoryPlayback: React.FC = () => {
  const { id } = useLocalSearchParams();
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  const { data, isLoading, error } = useFetchDetails(id as string);
  const item = data?.data || [];

  if (isLoading) {
    return (
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
    );
  }

  if (error) {
    return (
      <Text style={{ color: "red", textAlign: "center" }}>
        Error fetching library data! {error.message}
      </Text>
    );
  }

  const videoUrl =
    item?.videoContent?.length > 0 ? item?.videoContent[0]?.url : null;

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.media}>
        {/* <Image source={{ uri: item?.thumbnail }} style={styles.image} /> */}

        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: videoUrl,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{item?.title}</Text>
        <View style={styles.info}>
          <Text style={styles.infoTime}>15mins</Text>
          <TouchableOpacity style={styles.infoSave}>
            <Text>Save to library</Text>
          </TouchableOpacity>
          {item.category.map((cat: any, index: number) => (
            <Text style={styles.category} key={index}>
              {cat?.name}
            </Text>
          ))}
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            {item?.description && item.description}
          </Text>
        </View>
        {/* <TouchableOpacity activeOpacity={1.0} style={styles.button}>
          <AntDesign name="download" size={20} color="black" />
          <Text style={styles.buttonText}>Download and save offline</Text>
        </TouchableOpacity> */}
        <Link
          href={{
            pathname: "/library/quiz",
            params: {
              questions: JSON.stringify(item?.questionsContent[0].content),
            },
          }}
          style={styles.button}
        >
          Done? Take Quiz
        </Link>
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
  video: {
    width: "100%",
    height: 300,
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
    marginTop: 30,
  },

  bodyText: {
    fontSize: FontSizes.small,
    lineHeight: 19.5,
  },

  button: {
    backgroundColor: Colors.yellow,
    fontSize: FontSizes.medium,
    padding: 10,
    borderRadius: 50,
    marginTop: 130,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "100%",
    overflow: "hidden",
    textAlign: "center",
  },

  buttonText: {
    backgroundColor: Colors.yellow,
    fontSize: FontSizes.medium,
    textAlign: "center",
  },
});

export default StoryPlayback;
