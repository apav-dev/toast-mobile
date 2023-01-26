import Section from "./Section";
import { Text, StyleSheet, View } from "react-native";
import StarRating from "./StarRating";
import ReviewBar from "./ReviewBar";
import React from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchReviews } from "../api/fetchReviews";
import Typography from "../styles/typography";
import Reviews from "./Reviews";
import SectionTitle from "./SectionTitle";
import { uuid } from "../utils/uuid";

type ReviewsSectionProps = {
  beverageId: string;
  aggregateRating?: number;
  reviewCount?: number;
};

const ReviewsSection = ({
  beverageId,
  aggregateRating,
  reviewCount,
}: ReviewsSectionProps) => {
  // TODO: are these returned in order?
  const reviewResults = useQueries({
    queries: [5, 4, 3, 2, 1].map((score) => ({
      queryKey: ["reviewScore", beverageId, score],
      queryFn: () => fetchReviews(beverageId, 1, { rating: score }),
      staleTime: Infinity,
    })),
  });

  return (
    <Section>
      <SectionTitle title="Reviews" />
      <View style={styles.reviewsContainer}>
        <View style={styles.overallRatingContainer}>
          {aggregateRating && <StarRating rating={aggregateRating} />}
          {reviewCount && (
            <Text
              style={{ ...Typography.fontSize.x30, paddingLeft: 8 }}
            >{`${aggregateRating} (${reviewCount} Reviews)`}</Text>
          )}
        </View>

        <View style={{ paddingVertical: 16 }}>
          {[5, 4, 3, 2, 1].map((score, index) => {
            const reviewResult = reviewResults[index];
            if (reviewResult.isLoading) {
              return null;
            }
            const count = (reviewResult.data.response.count || 0) as number;
            return (
              <ReviewBar
                key={uuid()}
                score={score}
                reviewPercentage={Number((count / (reviewCount || 1)) * 100)}
                totalReviews={count}
              />
            );
          })}
        </View>
      </View>
      <Reviews beverageId={beverageId} reviewCount={reviewCount} />
    </Section>
  );
};

const styles = StyleSheet.create({
  reviewsContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  overallRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ReviewsSection;
