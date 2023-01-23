import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../App";
import StarRating from "./StarRating";

type ReviewProps = {
  authorName: string;
  content: string;
  rating: number;
  reviewDate: string;
};

const Review = ({ authorName, content, rating, reviewDate }: ReviewProps) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <View style={styles.authorNameContainer}>
          <Text style={styles.authorNameText}>{authorName}</Text>
        </View>
        <Text style={styles.reviewDateText}>{reviewDate}</Text>
      </View>
      <StarRating rating={rating} starSize={15} />
      <Text style={styles.reviewContentText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  authorNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorNameText: {
    fontFamily: "Sora_600SemiBold",
    fontSize: 16,
    // color: Colors.neutral.s900,
  },
  reviewDateText: {
    fontFamily: "Sora_400Regular",
    fontSize: 13,
    // color: Colors.neutral.s500,
  },
  reviewContentText: {
    fontFamily: "Sora_400Regular",
    fontSize: 14,
    // color: Colors.neutral.s700,
    paddingTop: 16,
  },
});

export default Review;
