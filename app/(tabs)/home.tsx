import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HomeLayout from "@/shared/HomeLayout";
import { Colors } from "@/theme";
import { router } from "expo-router";
import { useFetchData } from "@/hooks/usFetchData";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Error from "@/components/Error";

const categories: {
  label: string;
  icon?: ImageSourcePropType;
  color: string;
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

const Home: React.FC = () => {
  const { data: stories = [], isLoading, error, refetch } = useFetchData();
  const user = useSelector((state: RootState) => state.user.userResponse);

  const renderCategory = useCallback(
    ({ item }: { item: (typeof categories)[0] }) => (
      <TouchableOpacity
        style={[styles.categoryCard, { backgroundColor: item.color }]}
        activeOpacity={0.9}
      >
        <Image source={item.icon} />
        <Text style={styles.categoryText}>{item.label}</Text>
      </TouchableOpacity>
    ),
    []
  );

  const renderStory = useCallback(
    ({ item }: { item: any }) => (
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
          </View>
        </View>
      </View>
    ),
    []
  );

  return (
    <View style={styles.screen}>
      <HomeLayout isIcon>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Hi, {user?.name || "there"}</Text>
            <Text style={styles.subtitle}>
              Let&apos;s learn something new today
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.label}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />

          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured Stories</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => router.push("/(tabs)/library")}
            >
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {!isLoading ? (
            error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Oups 🤭</Text>
                <Text style={styles.errorText}>Something went wrong</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={() => refetch()} // refetch
                >
                  <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                data={stories?.data?.library}
                renderItem={renderStory}
                keyExtractor={(item) => item.title}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuredList}
                initialNumToRender={10}
              />
            )
          ) : (
            <ActivityIndicator size="small" color={Colors.main} />
          )}
        </View>
      </HomeLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 10 },
  textContainer: {
    marginVertical: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5D1889",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: { fontSize: 16, textAlign: "center" },
  sectionTitle: { fontSize: 18, marginVertical: 10, color: "#000" },
  categoryList: { paddingBottom: 10 },
  categoryCard: {
    height: 119,
    width: 131,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  categoryText: { fontSize: 16, marginTop: 5, textAlign: "center" },
  featuredSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  seeAllText: { fontSize: 14 },
  featuredList: { paddingBottom: 10 },
  storyCard: {
    width: 238,
    height: 250,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  storyImage: { height: "100%", width: "100%" },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 17,
    paddingVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    height: 150,
  },
  storyTitle: { fontSize: 14, fontWeight: "bold", color: "#FFF" },
  storyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    // left: 15,
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
  playButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.pink,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  playButtonText: { color: "#000", marginLeft: 5, fontSize: 12 },
  icon: { marginLeft: 10 },

  errorContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: Colors.pink,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  retryText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Home;
