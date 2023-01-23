import Section from "./Section";
import { Text, StyleSheet, View } from "react-native";
import { Colors, Typography } from "../App";
import StarRating from "./StarRating";
import ReviewBar from "./ReviewBar";
import React, { useEffect, useState } from "react";
import ReviewComponent from "./Review";
import { useQueries } from "@tanstack/react-query";
import { fetchReviews } from "../api/fetchReviews";
import ContentApiResponse from "../types/kg/content_api";
import Review from "../types/kg/review";

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
      queryKey: ["reviews", beverageId, score],
      queryFn: () => fetchReviews(beverageId, score),
      staleTime: Infinity,
    })),
  });

  return (
    <Section>
      <Text style={styles.headingText}>Reviews</Text>
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
                key={score}
                score={score}
                reviewPercentage={Number((count / (reviewCount || 1)) * 100)}
                totalReviews={count}
              />
            );
          })}
        </View>
      </View>
      <View>
        <ReviewComponent
          authorName={"Cheryl"}
          content={"Always excellent"}
          rating={5}
          reviewDate={"Jan 02, 2023"}
        />
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  headingText: {
    // fontFamily: Typography.fontFamily.semiBold,
    fontFamily: "Sora_600SemiBold",
    paddingLeft: 12,
    paddingVertical: 8,
    // fontSize: Typography.fontSize.x40,
    fontSize: 19,
    // color: Colors.neutral.s900,
  },
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
