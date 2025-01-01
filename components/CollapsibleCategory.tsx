// File: CollapsibleCategory.tsx
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CollapsibleCategoryProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleCategory: React.FC<CollapsibleCategoryProps> = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity onPress={toggleOpen} style={styles.header}>
        <View style={styles.row}>
          <View style={styles.circle} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.arrow}>
          {isOpen ? (
            <FontAwesome name="angle-up" size={24} color="black" />
          ) : (
            <FontAwesome name="angle-down" size={24} color="black" />
          )}
        </Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginVertical: 8,
    // borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    // paddingHorizontal: 10,
    // backgroundColor: "red",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  circle: {
    backgroundColor: "#C4A1FF",
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 15,
  },
  arrow: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    // padding: 16,
    backgroundColor: "#fff",
    marginTop: 10,
  },
});

export default CollapsibleCategory;
