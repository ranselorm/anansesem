import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HomeLayout from "@/shared/HomeLayout";

const categories = [
  { label: "History", color: "#3C9C27", icon: "book" },
  { label: "Science", color: "#09A4B2", icon: "science" },
  { label: "Folklore", color: "#FF8D6A", icon: "local-library" },
  { label: "Technology", color: "#000", icon: "science" },
];

const featuredStories = [
  {
    title: "Araba's Dream",
    duration: "15mins",
    image: require("../../assets/images/home1.png"),
  },
  {
    title: "Kivu in the Moonlight",
    duration: "20mins",
    image: require("../../assets/images/home2.png"),
  },
];

const Home: React.FC = () => {
  const renderCategory = ({ item }: { item: (typeof categories)[0] }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: item.color }]}
      activeOpacity={1.2}
    >
      <MaterialIcons name={"book"} size={30} color="#FFF" />
      <Text style={styles.categoryText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderStory = ({ item }: { item: (typeof featuredStories)[0] }) => (
    <View style={styles.storyCard}>
      <Image source={item.image} style={styles.storyImage} />
      <View style={styles.overlay}>
        <Text style={styles.storyTitle}>{item.title}</Text>
        <View style={styles.storyFooter}>
          <TouchableOpacity style={styles.playButton}>
            <MaterialIcons name="play-arrow" size={18} color="#FFF" />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
          <Text style={styles.storyDuration}>{item.duration}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <HomeLayout isIcon>
        <View style={styles.container}>
          <View style={{ marginTop: -15, marginBottom: 30 }}>
            <Text style={styles.title}>Hi, Elorm</Text>
            <Text style={{ fontSize: 16 }}>
              Let&apos;s learn something new today
            </Text>
          </View>

          {/* Categories */}
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.label}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />

          {/* Featured Stories */}
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured Stories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredStories}
            renderItem={renderStory}
            keyExtractor={(item) => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>
      </HomeLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5D1889",
    marginBottom: 10,
    fontFamily: "heading",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#000",
    marginVertical: 10,
  },

  categoryList: {
    paddingBottom: 10,
  },

  categoryCard: {
    height: 100,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  categoryText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  featuredSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  seeAllText: {
    fontSize: 14,
  },
  featuredList: {
    paddingBottom: 10,
  },
  storyCard: {
    width: 180,
    height: 180,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  storyImage: {
    height: "100%",
    width: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
  storyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5D1889",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  playButtonText: {
    color: "#FFF",
    marginLeft: 5,
    fontSize: 12,
  },
  storyDuration: {
    fontSize: 12,
    color: "#FFF",
  },
});

export default Home;
