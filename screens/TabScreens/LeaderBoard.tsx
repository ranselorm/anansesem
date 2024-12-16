import React, { useState } from "react";
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
import { Colors, Fonts, FontSizes } from "@/theme";

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
                <View style={styles.scoreCard} key={score.id}>
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
        return (
          <View style={styles.achievementContainer}>
            <View style={styles.wrapper}>
              <View style={styles.achievementCard}>
                <View style={styles.iconContainer}>
                  <Image
                    source={require("../../assets/images/wizard1.png")}
                    style={styles.badgeIcon}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.achievementTitle}>Word Wizard</Text>
                  <Text style={styles.description}>
                    Condition to Unlock this Badge
                  </Text>
                  <Text style={styles.points}>
                    <Image source={require("../../assets/icons/star.png")} />
                    <Text>10</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.achievementCard2}>
                <View style={styles.iconContainer2}>
                  <Image
                    source={require("../../assets/images/wizard2.png")}
                    style={styles.badgeIcon2}
                  />
                </View>
                <View style={styles.textContainer2}>
                  <Text style={styles.achievementTitle2}>Quiz Wiz</Text>
                  <Text style={styles.description2}>
                    Condition to Unlock this Badge
                  </Text>
                  <Text style={styles.points2}>
                    <Image source={require("../../assets/icons/star.png")} />
                    <Text>10</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
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
    borderRadius: 8,
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
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  achievementContainer: {
    flex: 1,
    backgroundColor: "red",
    width: "100%",
    height: 500,
    marginTop: 30,
  },

  wrapper: {
    flexDirection: "row",
    gap: 10,
  },

  achievementCard: {
    flexDirection: "row",
    backgroundColor: "#44C077",
    width: 197,
    height: 151,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },

  textContainer: {
    width: "70%",
    justifyContent: "space-evenly",
  },

  iconContainer: {
    flex: 1,
    position: "absolute",
    top: 7,
    right: 0,
  },

  badgeIcon: {
    width: 80,
    height: 80,
  },

  achievementTitle: {
    fontFamily: Fonts.heading,
    fontSize: 22,
    color: "#fff",
    fontWeight: 900,
  },

  description: {
    fontSize: 12,
    color: "#FFFFFF",
  },

  points: {
    flexDirection: "row",
    alignItems: "center",
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: Fonts.heading,
  },

  achievementCard2: {
    backgroundColor: "#D9D9D9",
    width: 127,
    height: 151,
    borderRadius: 13,
    padding: 10,
  },
  iconContainer2: {
    width: 105,
    height: 30,
  },
  badgeIcon2: {
    width: "100%",
    height: "100%",
  },
  achievementTitle2: {
    fontFamily: Fonts.heading,
    fontSize: 20,
    color: "#000",
    fontWeight: 900,
  },
  textContainer2: {
    width: "100%",
    justifyContent: "space-evenly",
  },
  description2: {
    fontSize: 12,
    color: "#000",
    marginVertical: 5,
  },
  points2: {
    flexDirection: "row",
    alignItems: "center",
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: Fonts.heading,
  },
});

export default LeaderBoard;
