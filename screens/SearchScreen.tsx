import {
  AutocompleteResult,
  useSearchActions,
} from "@yext/search-headless-react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import SearchBar from "../components/SearchBar";
import Ce_beverage from "../types/search/beverages";
import { renderHighlightedValue } from "../components/utils/renderHighlightedValue";
import { StackScreenProps } from "@react-navigation/stack";
import { SearchStackParamList } from "../App";
import { useEffect } from "react";
import { storeRecentSearches } from "../utils/storeRecentSearches";
import { uuid } from "../utils/uuid";

type SearchScreenNavigationProps = StackScreenProps<
  SearchStackParamList,
  "BeverageSearch"
>;

const SearchScreen = ({ navigation, route }: SearchScreenNavigationProps) => {
  const { verticalKey } = route.params;

  const searchActions = useSearchActions();

  useEffect(() => {
    searchActions.setVertical(verticalKey);
  }, [verticalKey]);

  const handleEntityPress = (result: AutocompleteResult) => {
    storeRecentSearches({ type: "category", query: result.value });
    if (result.key === "c_beverageCategories.name") {
      navigation.navigate("Results", {
        beverageTypeName: result.value,
      });
    }
  };

  const renderEntityPreviews = (
    sections: {
      label: string;
      results: AutocompleteResult[];
    }[]
  ) => {
    const beverageCategoryResults = sections.find(
      (section) => section.label === "Beverage Categories"
    )?.results;
    const beverageResults = sections.find(
      (section) => section.label === "Name"
    )?.results;

    return (
      <ScrollView style={{ height: "100%", marginTop: 16, marginBottom: 16 }}>
        {beverageCategoryResults?.map((result) => {
          const categoryName = result.matchedSubstrings
            ? {
                value: result.value,
                matchedSubstrings: result.matchedSubstrings,
              }
            : result.value;
          return (
            <TouchableOpacity
              key={uuid()}
              style={styles.entityContainer}
              onPress={() => handleEntityPress(result)}
            >
              {renderHighlightedValue(categoryName, {
                highlighted: styles.highlighted,
                nonHighlighted: styles.nonHighlighted,
              })}
            </TouchableOpacity>
          );
        })}
        {/* divider line view component */}
        {beverageCategoryResults?.length > 0 && beverageResults?.length > 0 && (
          <View
            style={{
              height: 1,
              backgroundColor: "lightgrey",
              marginHorizontal: 24,
            }}
          />
        )}
        {beverageResults?.map((result) => {
          const beverageName = result.matchedSubstrings
            ? {
                value: result.value,
                matchedSubstrings: result.matchedSubstrings,
              }
            : result.value;
          const beverage = result.relatedItem?.rawData as unknown as
            | Ce_beverage
            | undefined;
          const beverageImg = beverage?.primaryPhoto?.image.url;
          return (
            <TouchableOpacity
              key={uuid()}
              style={{
                ...styles.entityContainer,
                flexDirection: "row",
                alignContent: "center",
              }}
              onPress={() => {
                storeRecentSearches({ type: "beverage", query: result.value });
                navigation.navigate("BeverageScreen", {
                  name: result.value,
                });
              }}
            >
              <Image
                source={{ uri: beverageImg }}
                resizeMode="contain"
                style={{ width: 60, height: 60 }}
                defaultSource={require("../assets/bottle.png")}
              />
              <View style={{ flex: 1, justifyContent: "center" }}>
                {renderHighlightedValue(beverageName, {
                  highlighted: styles.highlighted,
                  nonHighlighted: styles.nonHighlighted,
                })}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  const handleSearch = (query: string) => {
    navigation.navigate("Results", {
      query,
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search for Wine, Beer, or Spirits"
        filterSearchFields={[
          {
            searchParameterField: {
              fieldApiName: "name",
              entityType: "ce_beverage",
              fetchEntities: true,
            },
          },
          {
            searchParameterField: {
              fieldApiName: "c_beverageCategories.name",
              entityType: "ce_beverage",
              fetchEntities: true,
            },
            removeDuplicates: true,
          },
        ]}
        onSearch={handleSearch}
        renderEntityPreviews={renderEntityPreviews}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  entityContainer: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  entityText: {
    fontFamily: "Sora_400Regular",
    fontSize: 16,
  },
  highlighted: {
    color: "orange",
    fontWeight: "bold",
    fontFamily: "Sora_400Regular",
    fontSize: 16,
    overflow: "hidden",
    numberOfLines: 1,
  },
  nonHighlighted: {
    color: "black",
    fontWeight: "400",
    fontFamily: "Sora_400Regular",
    fontSize: 16,
    numberOfLines: 1,
  },
});
