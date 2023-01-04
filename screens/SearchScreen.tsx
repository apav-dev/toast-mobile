import { AutocompleteResult } from "@yext/search-headless-react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import Ce_beverage from "../types/beverages";
import { renderHighlightedValue } from "../components/utils/renderHighlightedValue";
import { v4 as uuid } from "uuid";

const SearchScreen = () => {
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
      <ScrollView style={{ height: "100%", paddingTop: 16 }}>
        {beverageCategoryResults?.map((result) => {
          const categoryName = result.matchedSubstrings
            ? {
                value: result.value,
                matchedSubstrings: result.matchedSubstrings,
              }
            : result.value;
          return (
            <View key={uuid()} style={styles.entityContainer}>
              {renderHighlightedValue(categoryName, {
                highlighted: {
                  color: "orange",
                  fontWeight: "bold",
                  fontFamily: "Sora_400Regular",
                },
                nonHighlighted: {
                  color: "black",
                  fontWeight: "400",
                  fontFamily: "Sora_400Regular",
                },
              })}
            </View>
          );
        })}
        {/* divider line view component */}
        <View
          style={{
            height: 1,
            backgroundColor: "lightgrey",
            marginHorizontal: 24,
          }}
        />
        {beverageResults?.map((result) => {
          const beverageName = result.matchedSubstrings
            ? {
                value: result.value,
                matchedSubstrings: result.matchedSubstrings,
              }
            : result.value;
          const beverage = result.relatedItem as Ce_beverage;
          return (
            <View key={uuid()} style={styles.entityContainer}>
              {renderHighlightedValue(beverageName, {
                highlighted: {
                  color: "orange",
                  fontWeight: "bold",
                  fontFamily: "Sora_400Regular",
                },
                nonHighlighted: {
                  color: "black",
                  fontWeight: "400",
                  fontFamily: "Sora_400Regular",
                },
              })}
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
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
});
