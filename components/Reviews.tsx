import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { fetchReviews } from "../api/fetchReviews";
import Colors from "../styles/colors";
import Typography from "../styles/typography";
import ReviewComponent from "./Review";
import { v4 as uuid } from "uuid";

const reviewSortConfig = [
  {
    label: "Newest",
    sort: {
      key: "$sortBy__desc",
      value: "reviewDate",
    },
  },
  {
    label: "Oldest",
    sort: {
      key: "$sortBy__asc",
      value: "reviewDate",
    },
  },
  {
    label: "Highest",
    sort: {
      key: "$sortBy__desc",
      value: "rating",
    },
  },
  {
    label: "Lowest",
    sort: {
      key: "$sortBy__asc",
      value: "rating",
    },
  },
];

type ReviewsProps = {
  beverageId: string;
  reviewCount: number;
};

const Reviews = ({ reviewCount, beverageId }: ReviewsProps) => {
  const [activeSort, setActiveSort] = React.useState(reviewSortConfig[0]);

  const reviewsResponse = useQuery({
    queryKey: ["reviews", beverageId],
    queryFn: () =>
      fetchReviews(beverageId, 5, {
        [activeSort.sort.key]: activeSort.sort.value,
      }),
    staleTime: Infinity,
  });

  // format utc date in the format of Jan 1, 2021
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{`Reviews (${reviewCount})`}</Text>
        <Text style={styles.heading}>Sort By:</Text>
      </View>
      {reviewsResponse.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        reviewsResponse.data.response.docs.map((review) => (
          <ReviewComponent
            key={uuid()}
            authorName={review.authorName}
            content={review.content}
            rating={review.rating}
            reviewDate={formatDate(review.reviewDate)}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  heading: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: 13,
    color: Colors.neutral.s500,
  },
});

export default Reviews;
