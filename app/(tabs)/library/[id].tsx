import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Image,
} from "react-native";
import {
  FontAwesome,
  Feather,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { Fonts, FontSizes } from "@/theme";
import Spinner from "react-native-loading-spinner-overlay";
import { useFetchDetails } from "@/hooks/useFetchDetails";

const relatedStories = [
  {
    title: "The Brave Lion",
    thumbnail: "",
    reference: "brave-lion",
    duration: "5:00",
  },
  {
    title: "The Clever Monkey",
    thumbnail: "",
    reference: "clever-monkey",
    duration: "3:45",
  },
];

const StoryPlayback: React.FC = () => {
  const { id } = useLocalSearchParams();
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  const { data, isLoading, error } = useFetchDetails(id as string);
  const item = data?.data || {};
  // const relatedStories = item?.relatedStories || [];

  const [likeCount, setLikeCount] = useState(item?.likes || 5500);
  const [dislikeCount, setDislikeCount] = useState(item?.dislikes || 0);

  const handleLike = () => setLikeCount((prev: any) => prev + 1);
  const handleDislike = () => setDislikeCount((prev: any) => prev + 1);
  const handleShare = () => Alert.alert("Shared!");
  const handleRead = () => Alert.alert("Read initiated!");
  const handleListen = () => Alert.alert("Listening started!");
  const handleQuiz = () => Alert.alert("Quiz started!");

  // Loading State
  if (isLoading) {
    return (
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
    );
  }

  // Error State
  if (error) {
    return (
      <Text style={{ color: "red", textAlign: "center" }}>
        Error fetching story data! {error.message}
      </Text>
    );
  }

  // Video URL handling
  const videoUrl =
    item?.videoContent?.length > 0 ? item?.videoContent[0]?.url : null;

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      {/* Media Section */}
      <View style={styles.media}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: videoUrl || "https://www.example.com/default-video.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>

      <View style={styles.content}>
        {/* Title Row */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>{item?.title || "Untitled Story"}</Text>
          <Feather name="download" size={22} color="black" />
        </View>

        {/* Description */}
        <Text style={styles.bodyText}>
          {item?.description || "No description available for this story."}
        </Text>

        {/* Category Tags */}
        <View style={styles.info}>
          {item?.category?.map((cat: any, index: number) => (
            <Text style={styles.category} key={index}>
              {cat?.name}
            </Text>
          ))}
        </View>

        {/* Interactive Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rowContainer}
        >
          {/* Like/Dislike Button */}
          <View style={styles.likeDislikeContainer}>
            <TouchableOpacity onPress={handleLike} style={styles.button}>
              <AntDesign name="like2" size={20} color="black" />
              <Text style={styles.label}>{likeCount}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={handleDislike} style={styles.button}>
              <AntDesign name="dislike2" size={20} color="black" />
              <Text style={styles.label}>{dislikeCount}</Text>
            </TouchableOpacity>
          </View>

          {/* Share Button */}
          <TouchableOpacity style={styles.button} onPress={handleShare}>
            <MaterialCommunityIcons
              name="share-outline"
              size={22}
              color="black"
            />
            <Text style={styles.label}>Share</Text>
          </TouchableOpacity>

          {/* Read Button */}
          <TouchableOpacity style={styles.button} onPress={handleRead}>
            <FontAwesome5 name="readme" size={18} color="black" />
            <Text style={styles.label}>Read</Text>
          </TouchableOpacity>

          {/* Listen Button */}
          <TouchableOpacity style={styles.button} onPress={handleListen}>
            <Ionicons name="musical-note-outline" size={20} color="black" />
            <Text style={styles.label}>Listen</Text>
          </TouchableOpacity>

          {/* Quiz Button */}
          <TouchableOpacity style={styles.button} onPress={handleQuiz}>
            <MaterialIcons name="quiz" size={20} color="black" />
            <Text style={styles.label}>Quiz</Text>
          </TouchableOpacity>
        </ScrollView>

        <View>
          <Text style={styles.more}>More from creator</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storyCardContainer}
          >
            {relatedStories.map((story: any, index: number) => (
              <View style={styles.storyCard} key={index}>
                <Image
                  source={
                    story.thumbnail
                      ? { uri: story.thumbnail }
                      : require("../../../assets/images/home1.png")
                  }
                  style={styles.storyImage}
                />
                <View style={styles.storyOverlay}>
                  <Text style={styles.storyTitle}>{story.title}</Text>
                  <View style={styles.storyFooter}>
                    <TouchableOpacity
                      style={styles.playButton}
                      onPress={() => router.push(`/library/${story.reference}`)}
                    >
                      <MaterialIcons name="play-arrow" size={20} color="#FFF" />
                      <Text style={styles.playButtonText}>Play</Text>
                    </TouchableOpacity>
                    <Text style={styles.storyDuration}>
                      {story.duration || "N/A"}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Your existing styles...
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  media: {
    height: 300,
    width: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
    // marginTop: -40,
  },
  content: {
    padding: 16,
    marginTop: -40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 14,
    marginBottom: 16,
    color: "#333",
  },
  info: {
    flexDirection: "row",
    marginBottom: 16,
  },
  category: {
    backgroundColor: "#d4ffcb",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeDislikeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
    backgroundColor: "#eeeeee",
    borderRadius: 50,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "#000",
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    backgroundColor: "#eeeeee",
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 50,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: "#333",
    marginLeft: 5,
  },
  more: {
    fontFamily: Fonts.heading,
    color: "#000",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  storyCardContainer: {
    flexDirection: "row",
    gap: 10,
  },
  storyCard: {
    width: 238,
    height: 250,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 10,
  },
  storyImage: {
    width: "100%",
    height: 100,
  },
  storyOverlay: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  storyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF8D6A",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  playButtonText: {
    color: "#FFF",
    fontSize: 12,
    marginLeft: 5,
  },
  storyDuration: {
    fontSize: 12,
    color: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 4,
  },
});

export default StoryPlayback;
