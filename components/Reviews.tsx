import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { fetchReviews } from "../api/fetchReviews";
import Colors from "../styles/colors";
import Typography from "../styles/typography";
import ReviewComponent from "./Review";
import { v4 as uuid } from "uuid";
import FilterIcon from "./icons/FilterIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import SortModal from "./SortModal";
import Divider from "./Divider";

export type SortOption = {
  label: string;
  sort: {
    key: string;
    value: string;
  };
};

const sortOptions: SortOption[] = [
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
  const [activeSort, setActiveSort] = useState<SortOption>(sortOptions[0]);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const reviewsResponse = useQuery({
    queryKey: ["reviews", activeSort.label],
    queryFn: () =>
      fetchReviews(beverageId, 5, {
        [activeSort.sort.key]: activeSort.sort.value,
      }),
    staleTime: Infinity,
    enabled: activeSort !== null,
  });

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleOptionSelected = (option?: SortOption) => {
    if (option) {
      setActiveSort(option);
    }
    setSortModalVisible(false);
  };

  return (
    <>
      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{`Reviews (${reviewCount})`}</Text>
          <TouchableOpacity onPress={() => setSortModalVisible(true)}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ ...styles.heading, paddingRight: 2 }}
              >{`Sort By: ${activeSort?.label}`}</Text>
              <FilterIcon color={Colors.neutral.s500} size={16} />
            </View>
          </TouchableOpacity>
        </View>
        {reviewsResponse.isLoading ? (
          <Text>Loading...</Text>
        ) : (
          reviewsResponse.data.response.docs.map((review, index) => (
            <>
              <ReviewComponent
                key={uuid()}
                authorName={review.authorName}
                content={review.content}
                rating={review.rating}
                reviewDate={formatDate(review.reviewDate)}
              />
              {index !== reviewsResponse.data.response.docs.length - 1 && (
                <Divider />
              )}
            </>
          ))
        )}
      </View>
      {activeSort && (
        <SortModal
          options={sortOptions}
          selectedOption={activeSort}
          onOptionSelected={handleOptionSelected}
          visible={sortModalVisible}
        />
      )}
    </>
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
