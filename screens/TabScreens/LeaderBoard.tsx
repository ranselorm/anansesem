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
import { Colors, FontSizes } from "@/theme";

type Score = {
  id: number;
  username: string;
  score: number;
};

const scores: Score[] = [
  { id: 1, username: "Username", score: 1690 },
  { id: 2, username: "Username", score: 1500 },
  { id: 3, username: "Username", score: 1300 },
  { id: 4, username: "Username", score: 1100 },
  { id: 5, username: "Username", score: 4100 },
  { id: 6, username: "Username", score: 9200 },
  { id: 7, username: "Username", score: 2570 },
];

type Tab = "Leaderboard" | "Achievements";

const LeaderBoard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("Leaderboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Leaderboard":
        return (
          <View style={styles.scoreContainer}>
            {scores &&
              scores.map((score) => (
                <View style={styles.scoreCard}>
                  <Text style={styles.rankText}>{score.id}</Text>
                  <View style={styles.placeholder}>
                    <MaterialIcons name="person" size={20} color="#FFBB00" />
                  </View>
                  <Text style={styles.usernameText}>{score.username}</Text>
                  <View style={styles.scoreDetails}>
                    <MaterialIcons name="star" size={20} color="#FFD700" />
                    <Text style={styles.scoreText}>{score.score}</Text>
                  </View>
                </View>
              ))}
          </View>
        );
      case "Achievements":
        return <Text>This is the Achievements content.</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.screen}>
      <HomeLayout title="Leaderboard" isIcon>
        <View style={styles.container}>
          {/* Tabs */}
          <View style={styles.tabContainer}>
            {(["Leaderboard", "Achievements"] as Tab[]).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Tab Content */}
          <View style={styles.contentContainer}>{renderContent()}</View>
        </View>
      </HomeLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "#e0e0e0",
    borderRadius: 8,
    margin: 16,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: Colors.purple,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
  },
  tabText: {
    fontSize: FontSizes.medium,
    color: "#555",
  },
  activeTabText: {
    color: "#000",
    // fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  contentText: {
    fontSize: 18,
    textAlign: "center",
  },

  scoreContainer: {
    backgroundColor: "#09A4B2",
    height: 500,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    padding: 20,
    gap: 15,
  },

  scoreCard: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    // marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    paddingHorizontal: 15,
    elevation: 2,
  },
  rankText: {
    fontSize: 18,
    marginRight: 8,
  },
  placeholder: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: "#FF8D6A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
  },
  usernameText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  scoreDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default LeaderBoard;
