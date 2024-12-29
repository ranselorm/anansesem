import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "@rneui/themed";

export const PlaceHolders = () => {
  const skeletonStyle = {
    borderRadius: 6,
    backgroundColor: "#F0F0F0",
  };

  return (
    <View style={styles.container}>
      {[...Array(2)].map((_, index) => (
        <Skeleton
          key={index}
          width={238}
          height={200}
          style={skeletonStyle}
          animation="pulse"
        />
      ))}
    </View>
  );
};

export const VideoPlaceHolder = () => {
  return (
    <View>
      <Skeleton width={200} height={300} />
    </View>
  );
};
export const IconsPlaceHolder = () => {
  return (
    <View>
      <Skeleton width={200} height={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 20, // For spacing between placeholders
  },
});
