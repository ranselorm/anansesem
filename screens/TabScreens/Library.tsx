import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HomeLayout from "@/shared/HomeLayout";
import { Colors } from "@/theme";

interface Category {
  label: string;
  color: string;
  icon: string;
}

interface Story {
  title: string;
  duration: string;
  image: any;
}

const categories: Category[] = [
  { label: "Featured stories", color: "#FFD700", icon: "star" },
  { label: "Science", color: "#09A4B2", icon: "science" },
  { label: "Technology", color: "#09A4B2", icon: "science" },
  { label: "Folklore", color: "#FF8D6A", icon: "local-library" },
];

const stories: Story[] = [
  {
    title: "Ananse and the pot of wisdom",
    duration: "15mins",
    image: require("../../assets/images/home1.png"),
  },
  {
    title: "Araba's Dream",
    duration: "15mins",
    image: require("../../assets/images/home2.png"),
  },
  {
    title: "The Man Whosd Never Lies",
    duration: "15mins",
    image: require("../../assets/images/home1.png"),
  },
  {
    title: "The Man Who Nesvera Lies",
    duration: "15mins",
    image: require("../../assets/images/home1.png"),
  },
  {
    title: "The Man Who Nesver Lies",
    duration: "15mins",
    image: require("../../assets/images/home1.png"),
  },
];

const Library: React.FC = () => {
  // Set the first category as selected by default
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].label
  );

  const handleCategoryPress = (label: string) => {
    setSelectedCategory(label);
  };

  const renderCategory = ({ item }: { item: Category }) => {
    const isSelected = selectedCategory === item.label;

    return (
      <TouchableOpacity
        activeOpacity={1.2}
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
      <Image source={item.image} style={styles.storyImage} />
      <View style={styles.storyOverlay}>
        <Text style={styles.storyTitle}>{item.title}</Text>
        <View style={styles.storyFooter}>
          <TouchableOpacity style={styles.playButton}>
            <MaterialIcons name="play-arrow" size={20} color="#FFF" />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>
          <Text style={styles.storyDuration}>{item.duration}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <HomeLayout title="Library" isIcon>
      <FlatList
        data={stories}
        renderItem={renderStoryCard}
        keyExtractor={(item) => item.title}
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
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 3,
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
    paddingHorizontal: 16,
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
    position: "absolute",
    bottom: 0,
    top: 0,
    width: "65%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 20,
    justifyContent: "center",
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
  },
  storyFooter: {
    flexDirection: "row",
    // justifyContent: "",
    alignItems: "center",
    gap: 20,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6F61",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  playButtonText: {
    color: "#FFF",
    fontSize: 14,
    marginLeft: 6,
  },
  storyDuration: {
    fontSize: 12,
    color: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 4,
  },
});

export default Library;
