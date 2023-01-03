import { AutocompleteResult } from "@yext/search-headless-react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import Ce_beverage from "../types/beverages";
import { v4 as uuid } from "uuid";

const SearchScreen = () => {
  const renderEntityPreviews = (
    sections: {
      /** label will only have value if the sectioned prop equals true*/
      label?: string;
      results: AutocompleteResult[];
    }[]
  ) => {
    const beverageCategoryResults = sections.find(
      (section) => section.label === "Beverage Categories"
    )?.results;
    const beverageResults = sections.find(
      (section) => section.label === "Name"
    )?.results;

    // console.log("test");

    // return <View style={{ height: 96, backgroundColor: "black" }}></View>;

    return (
      <ScrollView style={{ height: "100%" }}>
        {beverageCategoryResults?.map((result) => {
          console.log(result.value);
          return (
            <View key={uuid()}>
              <Text>{result.value}</Text>
            </View>
          );
        })}
        {beverageResults?.map((result) => {
          console.log(result.value);

          const beverage = result.relatedItem as Ce_beverage;
          return (
            <View style={{ padding: 4 }} key={uuid}>
              <Text style={{ fontFamily: "Sora_400Regular" }}>
                {result.value}
              </Text>
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
});
