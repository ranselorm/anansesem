import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HomeLayout from "@/shared/HomeLayout";
import { Colors } from "@/theme";
import { useFetchData } from "../../../hooks/usFetchData";
import { router, Link } from "expo-router";

interface Category {
  label: string;
  color: string;
  icon: string;
}

interface Story {
  id: string;
  title: string;
  reference: string;
  description: string;
  thumbnail: string;
  duration?: string;
}

const categories: Category[] = [
  { label: "Featured Stories", color: "#FFD700", icon: "star" },
  { label: "Science", color: "#09A4B2", icon: "science" },
  { label: "Technology", color: "#09A4B2", icon: "science" },
  { label: "Folklore", color: "#FF8D6A", icon: "local-library" },
];

const Library: React.FC = () => {
  const { data: stories = [], isLoading, error } = useFetchData();

  // console.log("Fetched stories:", stories?.data?.library || []);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories.length > 0 ? categories[0].label : ""
  );

  const handleCategoryPress = (label: string) => {
    setSelectedCategory(label);
  };

  const renderCategory = ({ item }: { item: Category }) => {
    const isSelected = selectedCategory === item.label;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.categoryButton,
          {
            backgroundColor: isSelected ? Colors.yellow : "transparent",
            borderWidth: isSelected ? 1 : 0,
            borderColor: isSelected ? "black" : "transparent",
          },
        ]}
        onPress={() => handleCategoryPress(item.label)}
      >
        <Text
          style={[
            styles.categoryText,
            { color: isSelected ? "black" : "#000" },
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderStoryCard = ({ item }: { item: Story }) => (
    <View style={styles.storyCard}>
      <Image
        source={
          item.thumbnail
            ? { uri: item.thumbnail }
            : require("../../../assets/images/onboard2.png")
        }
        style={styles.storyImage}
      />
      <View style={styles.storyOverlay}>
        <Text style={styles.storyTitle}>{item.title}</Text>
        {/* <Text style={styles.storyDescription}>{item.description}</Text> */}
        <View style={styles.storyFooter}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => router.push(`/library/${item.reference}`)}
          >
            <MaterialIcons name="play-arrow" size={20} color="#FFF" />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
          <Text style={styles.storyDuration}>{item.duration || "N/A"}</Text>
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

  // Error state
  if (error) {
    return (
      <Text style={{ color: "red", textAlign: "center" }}>
        Error fetching library data! {error.message}
      </Text>
    );
  }

  // Main component
  return (
    <HomeLayout title="Library" isIcon>
      <FlatList
        data={stories?.data?.library || []}
        renderItem={renderStoryCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={
          <>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={24} color="#000" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search stories"
                placeholderTextColor="#000"
              />
              <MaterialIcons name="menu" size={24} color="#000" />
            </View>

            {/* Categories */}
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={(item) => item.label}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
            />
          </>
        }
      />
    </HomeLayout>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 4,
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: "#000",
  },
  categoryList: {
    marginBottom: 16,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    marginLeft: 8,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  storyCard: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
  },
  storyImage: {
    width: "100%",
    height: 150,
  },
  storyOverlay: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "75%",
    justifyContent: "center",
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  storyDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  storyFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF8D6A",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBlockColor: "#000",
  },
  playButtonText: {
    color: "#FFF",
    fontSize: 14,
    marginLeft: 6,
  },
  storyDuration: {
    fontSize: 12,
    color: "#FFF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 4,
  },
});

export default Library;
