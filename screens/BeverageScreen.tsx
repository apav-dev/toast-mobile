import { StackScreenProps } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { Colors, SearchStackParamList, Typography } from "../App";
import { useQuery } from "@tanstack/react-query";
import { getBeverageByName } from "../api/getBeverageByName";
import Beverage from "../types/kg/beverage";
import BeverageVariantList from "../components/BeverageVariantList";
import StarRating from "../components/StarRating";
import DetailsTable from "../components/DetailsTable";
import Section from "../components/Section";
import ReviewsSection from "../components/ReviewsSection";
// import { ScrollView } from "react-native-gesture-handler";

export type SearchResultsScreenRouteProps = StackScreenProps<
  SearchStackParamList,
  "BeverageScreen"
>;

const tableData = [
  ["Category", "Ale"],
  ["Origin", "California, USA"],
  ["ABV", "5.0%"],
];

const tableHead = ["", ""];

const BeverageScreen = ({
  route,
  navigation,
}: SearchResultsScreenRouteProps) => {
  const { name } = route.params;
  const [beverage, setBeverage] = useState<Beverage | null>();
  const [ratingAgg, setRatingAgg] = useState<{
    averageRating?: number;
    reviewCount?: number;
  } | null>();
  const [imageSource, setImageSource] = useState("");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["beverage", name],
    queryFn: () => getBeverageByName(name),
  });

  useEffect(() => {
    if (data?.response.docs[0]) {
      const bev = data?.response.docs[0];
      console.log(bev);

      setBeverage(bev);
      if (bev.primaryPhoto.image.url) {
        setImageSource(bev.primaryPhoto.image.url);
      }

      if (bev.ref_reviewsAgg) {
        setRatingAgg(bev.ref_reviewsAgg[0]);
      }
    }
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      <Section
        sectionStyles={{
          marginTop: 0,
          // borderBottomColor: Colors.neutral.s200,
          borderBottomWidth: 1,
        }}
      >
        <View style={styles.headingContainer}>
          <Image
            source={{ uri: imageSource }}
            style={{ width: 150, height: 300 }}
            defaultSource={require("../assets/bottle.png")}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                // fontWeight: "bold",
                marginLeft: 10,
                paddingVertical: 20,
                fontSize: 20,
                fontFamily: Typography.fontFamily.semiBold,
              }}
            >
              {name}
            </Text>
            <View style={{ marginLeft: 10 }}>
              {(ratingAgg?.averageRating || beverage?.c_rating) && (
                <StarRating
                  rating={Number(
                    ratingAgg?.averageRating || beverage?.c_rating
                  )}
                />
              )}
              {ratingAgg?.averageRating && (
                <View style={{ marginTop: 8, flexDirection: "row" }}>
                  <Text
                    style={{
                      fontFamily: "Sora_400Regular",
                      fontSize: 16,
                      // color: Colors.neutral.s700,
                      paddingRight: 5,
                    }}
                  >
                    {ratingAgg.averageRating.toFixed(1)}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Sora_400Regular",
                      fontSize: 16,
                      // color: Colors.neutral.s700,
                    }}
                  >
                    {`(${ratingAgg.reviewCount} ratings)`}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {beverage?.c_variantBeverages && (
          <BeverageVariantList variants={beverage.c_variantBeverages} />
        )}
      </Section>

      <Section
        sectionStyles={{
          borderTopWidth: 1,
          // borderTopColor: Colors.neutral.s200,
        }}
      >
        <DetailsTable
          title="Details"
          data={[
            ["Category", "Ale"],
            ["Origin", "France"],
            ["ABV", "5.0%"],
          ]}
        />
        <View style={{ paddingVertical: 16 }}>
          <Text
            style={{
              // fontFamily: Typography.fontFamily.semiBold,
              fontFamily: "Sora_600SemiBold",
              paddingLeft: 12,
              paddingVertical: 8,
              // fontSize: Typography.fontSize.x40,
              fontSize: 19,
              // color: Colors.neutral.s900,
            }}
          >
            Description
          </Text>
          <Text
            style={{
              fontFamily: "Sora_400Regular",
              ...Typography.fontSize.x20,
              // color: Colors.neutral.s700,
              padding: 10,
            }}
          >
            {beverage?.description}
          </Text>
        </View>
      </Section>
      {beverage && (
        <ReviewsSection
          beverageId={beverage.id}
          reviewCount={ratingAgg.reviewCount}
          aggregateRating={Number(
            ratingAgg?.averageRating || beverage?.c_rating
          ).toFixed(1)}
        ></ReviewsSection>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: "100%",
    // backgroundColor: Colors.neutral.s100,
    overflow: "scroll",
  },
  headingContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});

export default BeverageScreen;
