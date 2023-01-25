import { StackScreenProps } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { SearchStackParamList } from "../App";
import { useQuery } from "@tanstack/react-query";
import { getBeverageByName } from "../api/getBeverageByName";
import Beverage, { BeverageVariant } from "../types/kg/beverage";
import BeverageVariantList from "../components/BeverageVariantList";
import StarRating from "../components/StarRating";
import DetailsTable from "../components/DetailsTable";
import Section from "../components/Section";
import ReviewsSection from "../components/ReviewsSection";
import Colors from "../styles/colors";
import Typography from "../styles/typography";
import SectionTitle from "../components/SectionTitle";
import LocationsList from "../components/LocationsList";
import {
  provideHeadless,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
// import { ScrollView } from "react-native-gesture-handler";

export type SearchResultsScreenRouteProps = StackScreenProps<
  SearchStackParamList,
  "BeverageScreen"
>;

const searcher = provideHeadless({
  apiKey: "10a44dca245f5fd3faba055fd4d28e1d",
  experienceKey: "toast",
  locale: "en",
  verticalKey: "locations",
  headlessId: "locations-searcher",
});

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
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");

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

      if (bev.c_variantBeverages) {
        setSelectedVariantId(bev.c_variantBeverages[0].id);
      }
    }
  }, [data]);

  const handleVariantPress = (variant: BeverageVariant) => {
    if (variant.primaryPhoto) {
      setImageSource(variant.primaryPhoto.image.url);
    }
    setSelectedVariantId(variant.id);
  };

  // TODO: Add loading state
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <ScrollView style={styles.container}>
        <Section
          sectionStyles={{
            marginTop: 0,
            borderBottomColor: Colors.neutral.s200,
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
                        color: Colors.neutral.s700,
                        paddingRight: 5,
                      }}
                    >
                      {ratingAgg.averageRating.toFixed(1)}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Sora_400Regular",
                        fontSize: 16,
                        color: Colors.neutral.s700,
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
            <BeverageVariantList
              variants={beverage.c_variantBeverages}
              onVariantPress={handleVariantPress}
              selectedVariantId={selectedVariantId}
            />
          )}
        </Section>
        <LocationsList />
        <Section
          sectionStyles={{
            borderTopWidth: 1,
            borderTopColor: Colors.neutral.s200,
          }}
        >
          <DetailsTable
            title="Details"
            data={[
              [
                // the category isn't guaranteed to be correct as it depends on the Knowledge Graph
                "Category",
                beverage?.c_beverageCategories[
                  beverage.c_beverageCategories.length - 1
                ].name,
              ],
              // TODO: add state to origin if it exists
              ["Origin", beverage?.c_originCountry],
              [
                "ABV",
                Number(beverage?.c_abv) % 1 === 0
                  ? beverage?.c_abv + ".0%"
                  : beverage?.c_abv + "%",
              ],
            ]}
          />
          <View style={{ paddingVertical: 16 }}>
            <SectionTitle title="Description" />
            <Text
              style={{
                fontFamily: Typography.fontFamily.regular,
                ...Typography.fontSize.x20,
                color: Colors.neutral.s700,
                padding: 10,
              }}
            >
              {beverage?.description}
            </Text>
          </View>
        </Section>
        {ratingAgg && (
          <ReviewsSection
            beverageId={beverage.id}
            reviewCount={ratingAgg.reviewCount}
            aggregateRating={Number(
              (ratingAgg?.averageRating || beverage?.c_rating).toFixed(1)
            )}
          ></ReviewsSection>
        )}
      </ScrollView>
    </SearchHeadlessProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral.s100,
    overflow: "scroll",
  },
  headingContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default BeverageScreen;
