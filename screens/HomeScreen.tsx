import { useQuery } from "@tanstack/react-query";
import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { fetchHomeScreen } from "../api/fetchHomeScreen";
import LoadingSpinner from "../components/icons/LoadingSpinner";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import Colors from "../styles/colors";
import Typography from "../styles/typography";
import { v4 as uuid } from "uuid";
import { storeRecentSearches } from "../utils/storeRecentSearches";

const HomeScreen = ({ navigation }) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["home"],
    queryFn: () => fetchHomeScreen(),
  });

  const handleBeveragePress = async (beverage) => {
    await storeRecentSearches({ type: "beverage", query: beverage.name });
    navigation.navigate("Search", {
      params: { name: beverage.name },
      screen: "BeverageScreen",
      initial: false,
    });
  };

  const handleCategoryPress = async (category) => {
    await storeRecentSearches({ type: "category", query: category.name });
    navigation.navigate("Search", {
      params: { beverageTypeName: category.name },
      screen: "Results",
      initial: false,
    });
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ScrollView style={styles.container}>
          <Section>
            <SectionTitle title={"What'll you have?"} />
            <FlatList
              horizontal
              data={data?.response.docs[0].c_featuredCategories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleCategoryPress(item)}
                  style={styles.featuredBeverageContainer}
                >
                  {item.c_mobileIcon && (
                    <Image
                      source={{ uri: item.c_mobileIcon.image.url }}
                      style={{ width: 75, height: 75 }}
                      defaultSource={require("../assets/bottle.png")}
                    />
                  )}
                  <Text style={styles.featuredBeverageText} numberOfLines={2}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={() => uuid()}
            />
          </Section>
          {data?.response.docs[0].c_featuredCollections.map((collection) => (
            <Section key={collection.name}>
              <SectionTitle title={collection.name} />
              <FlatList
                horizontal
                data={collection.c_associatedBeverages}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleBeveragePress(item)}
                    style={styles.featuredBeverageContainer}
                  >
                    <Image
                      source={{ uri: item.primaryPhoto.image.url }}
                      style={{ width: 75, height: 150 }}
                      defaultSource={require("../assets/bottle.png")}
                    />
                    <Text style={styles.featuredBeverageText} numberOfLines={2}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={() => uuid()}
              />
            </Section>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral.s100,
    overflow: "scroll",
  },
  featuredBeverageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: Colors.neutral.s200,
    borderWidth: 1,
    borderRadius: 5,
    margin: 8,
    width: 150,
    alignItems: "center",
  },
  featuredBeverageText: {
    fontFamily: Typography.fontFamily.regular,
    ...Typography.fontSize.x10,
    color: Colors.neutral.s800,
  },
});

export default HomeScreen;
