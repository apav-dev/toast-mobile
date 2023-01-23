import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../styles/colors";

type ReviewBarProps = {
  score: number;
  reviewPercentage: number;
  totalReviews: number;
};

const ReviewBar = ({
  score,
  reviewPercentage,
  totalReviews,
}: ReviewBarProps) => {
  const barWidth = { width: `${reviewPercentage}%` };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{score}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.bar, barWidth]} />
      </View>
      <View style={styles.reviewCountContainer}>
        <Text style={styles.reviewCount}>{totalReviews}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    fontFamily: "Sora_400Regular",
  },
  score: {
    marginRight: 10,
  },
  barContainer: {
    flex: 1,
    backgroundColor: Colors.neutral.s200,
    height: 16,
    position: "relative",
  },
  bar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: Colors.primary.orange,
  },
  reviewCountContainer: {
    width: 46,
  },
  reviewCount: {
    marginLeft: 10,
  },
});

export default ReviewBar;
