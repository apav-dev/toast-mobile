import { StackScreenProps } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { SearchStackParamList } from "../App";
import { useQuery } from "@tanstack/react-query";
import { getBeverageByName } from "../api/getBeverageByName";
import Beverage from "../types/kg/beverage";
import BeverageVariantList from "../components/BeverageVariantList";
import StarRating from "../components/StarRating";

export type SearchResultsScreenRouteProps = StackScreenProps<
  SearchStackParamList,
  "BeverageScreen"
>;

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
    <View style={styles.container}>
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
              fontFamily: "Sora_400Regular",
            }}
          >
            {name}
          </Text>
          <View style={{ marginLeft: 10 }}>
            {(ratingAgg?.averageRating || beverage?.c_rating) && (
              <StarRating
                rating={Number(ratingAgg?.averageRating || beverage?.c_rating)}
              />
            )}
            {ratingAgg?.averageRating && (
              <View style={{ marginTop: 8, flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "Sora_400Regular",
                    fontSize: 16,
                    color: "#666",
                    paddingRight: 5,
                  }}
                >
                  {ratingAgg.averageRating.toFixed(1)}
                </Text>
                <Text
                  style={{
                    fontFamily: "Sora_400Regular",
                    fontSize: 16,
                    color: "#666",
                  }}
                >
                  {`(${ratingAgg.reviewCount} ratings)`}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {/* View that is a horizontal list of the beverage.c_variantBeverages */}
      {beverage?.c_variantBeverages && (
        <BeverageVariantList variants={beverage.c_variantBeverages} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  headingContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    // marginVertical: 30,
  },
});

export default BeverageScreen;
