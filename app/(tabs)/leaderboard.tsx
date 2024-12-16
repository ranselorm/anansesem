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
                    <Image source={require("../../assets/icons/star2.png")} />
                    <Text>15</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.achievementCard3}>
              <View style={styles.textContainer3}>
                <Text style={styles.achievementTitle3}>
                  Master of Imagination
                </Text>
                <Text style={styles.description3}>
                  Condition to Unlock this Badge
                </Text>
              </View>
              <View style={styles.footer}>
                <View style={styles.iconContainer3}>
                  <Image
                    source={require("../../assets/icons/imagination.png")}
                    style={styles.badgeIcon3}
                  />
                </View>
                <Text style={styles.points3}>
                  <Image
                    source={require("../../assets/icons/star2.png")}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text>200</Text>
                </Text>
              </View>
            </View>

            <View style={styles.wrapper}>
              {/* fourth */}
              <View style={styles.achievementCard4}>
                <View style={styles.iconContainer4}>
                  <Image
                    source={require("../../assets/images/writer1.png")}
                    style={styles.badgeIcon4}
                  />
                </View>
                <View style={styles.textContainer4}>
                  <Text style={styles.achievementTitle4}>Daily Writer</Text>
                  <Text style={styles.description4}>
                    Condition to Unlock this Badge
                  </Text>
                  <Text style={styles.points4}>
                    <Image source={require("../../assets/icons/star2.png")} />
                    <Text>15</Text>
                  </Text>
                </View>
              </View>
              {/* fith */}

              <View style={styles.achievementCard5}>
                <View style={styles.iconContainer4}>
                  <Image
                    source={require("../../assets/images/seeker.png")}
                    style={styles.badgeIcon4}
                  />
                </View>
                <View style={styles.textContainer4}>
                  <Text style={styles.achievementTitle4}>Knowledge Seeker</Text>
                  <Text style={styles.description4}>
                    Condition to Unlock this Badge
                  </Text>
                  <Text style={styles.points4}>
                    <Image source={require("../../assets/icons/star2.png")} />
                    <Text>20</Text>
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
    // backgroundColor: "red",
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

  achievementCard3: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    height: 151,
    borderRadius: 13,
    padding: 10,
    marginTop: 12,
  },

  textContainer3: {
    alignItems: "center",
    marginBottom: 10,
  },

  achievementTitle3: {
    fontFamily: Fonts.heading,
    fontSize: 20,
    color: "#000",
    fontWeight: 900,
    textAlign: "center",
  },

  description3: {
    fontSize: 12,
    color: "#000",
    textAlign: "center",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  iconContainer3: {
    width: 73,
    height: 83,
  },

  badgeIcon3: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  points3: {
    marginLeft: 5,
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },

  achievementCard4: {
    flexDirection: "row",
    backgroundColor: "#C4A1FF",
    width: 168,
    height: 151,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },

  textContainer4: {
    width: "100%",
    justifyContent: "space-evenly",
  },

  iconContainer4: {
    flex: 1,
    position: "absolute",
    bottom: 7,
    right: 10,
  },

  badgeIcon4: {
    width: 51,
    height: 93,
  },

  achievementTitle4: {
    fontFamily: Fonts.heading,
    fontSize: 22,
    color: "#000",
    fontWeight: 900,
  },

  description4: {
    fontSize: 12,
    color: "#000",
    width: "70%",
  },

  points4: {
    flexDirection: "row",
    alignItems: "center",
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: Fonts.heading,
  },

  achievementCard5: {
    flexDirection: "row",
    backgroundColor: "#FF8D6A",
    width: 168,
    height: 151,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});

export default LeaderBoard;
