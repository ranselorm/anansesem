import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HomeLayout from "@/shared/HomeLayout";
import { Colors } from "@/theme";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useFetchData } from "@/hooks/usFetchData";
import Spinner from "react-native-loading-spinner-overlay";

const categories: {
  label: string;
  icon?: ImageSourcePropType;
  color: any;
}[] = [
  {
    label: "History",
    color: "#3C9C27",
    icon: require("../../assets/icons/his1.png"),
  },
  {
    label: "Science",
    color: "#09A4B2",
    icon: require("../../assets/icons/his2.png"),
  },
  {
    label: "Folklore",
    color: "#FF8D6A",
    icon: require("../../assets/icons/his3.png"),
  },
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
  {
    title: "Kiivu in the Moonlight",
    duration: "20mins",
    image: require("../../assets/images/home2.png"),
  },
  {
    title: "Kivu5 in the Moonlight",
    duration: "20mins",
    image: require("../../assets/images/home2.png"),
  },
];

const Home: React.FC = () => {
  const { data: stories = [], isLoading, error } = useFetchData();

  const renderCategory = ({ item }: { item: (typeof categories)[0] }) => (
    <TouchableOpacity
      style={[styles.categoryCard, { backgroundColor: item.color }]}
      activeOpacity={1.2}
    >
      <Image source={item.icon} />
      <Text style={styles.categoryText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderStory = ({ item }: { item: any }) => (
    <View style={styles.storyCard}>
      <Image source={{ uri: item?.thumbnail }} style={styles.storyImage} />
      <View style={styles.overlay}>
        <Text style={styles.storyTitle}>{item.title}</Text>
        <View style={styles.storyFooter}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => router.push(`/library/${item.reference}`)}
          >
            <Text style={styles.playButtonText}>Play</Text>
            <MaterialIcons
              name="play-arrow"
              size={18}
              color="#FFF"
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.storyDuration}>{item.duration}</Text>
        </View>
      </View>
    </View>
  );

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
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("/(tabs)/library")}
            >
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={stories?.data?.library}
            renderItem={renderStory}
            keyExtractor={(item) => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>
      </HomeLayout>

      {/* <BottomSheet ref={sheetRef} styles={{ zIndex: 9999 }}>
        <View>
          <Text>Anansesem Terms and Conditions</Text>
          <Text>
            Please read these Terms and Conditions carefully before using the
            Anansesem app.
          </Text>
        </View>
      </BottomSheet> */}
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
    height: 119,
    width: 131,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  categoryText: {
    color: "#000",
    fontSize: 16,
    // fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  featuredSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    // marginTop: -20,
  },
  seeAllText: {
    fontSize: 14,
  },
  featuredList: {
    paddingBottom: 10,
  },
  storyCard: {
    width: 238,
    height: 250,
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
    paddingVertical: 20,
    paddingHorizontal: 15,
    height: 140,
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
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
    backgroundColor: Colors.pink,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  playButtonText: {
    color: "#000",
    marginLeft: 5,
    fontSize: 12,
  },

  icon: {
    backgroundColor: "black",
    marginLeft: 10,
    borderRadius: 50,
    padding: 2,
  },
  storyDuration: {
    fontSize: 12,
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
});

export default Home;
