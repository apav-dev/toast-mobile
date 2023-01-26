import { StackScreenProps } from "@react-navigation/stack";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { SearchStackParamList } from "../App";
import { v4 as uuid } from "uuid";
import Colors from "../styles/colors";

export type SearchResultsScreenRouteProps = StackScreenProps<
  SearchStackParamList,
  "Results"
>;

const placeholderImg = require("../assets/bottle.png");

/**
 * 1. Performance of long list of results with images
 * 3. typing
 * 4. loading indicator
 * 5. more info on cards
 */
const SearchResultsScreen = ({
  route,
  navigation,
}: SearchResultsScreenRouteProps) => {
  const { query, beverageTypeName } = route.params;

  const [displayableResults, setDisplayableResults] = useState([]);

  const isSearchLoading = useSearchState(
    (state) => state.searchStatus.isLoading
  );
  const resultCount = useSearchState((state) => state.vertical.resultsCount);
  const offset = useSearchState((state) => state.vertical.offset) ?? 0;
  const limit = useSearchState((state) => state.vertical.limit) ?? 20;

  const searchActions = useSearchActions();

  useEffect(() => {
    setDisplayableResults([]);
    if (query) {
      executeSearch(query);
    } else if (beverageTypeName) {
      executeSearch("", [
        {
          selected: true,
          filter: {
            kind: "fieldValue",
            fieldId: "c_beverageCategories.name",
            matcher: Matcher.Equals,
            value: beverageTypeName,
          },
        },
      ]);
    }
    // on unmount, clear the results, filters, and offser
    return () => {
      setDisplayableResults([]);
      searchActions.setOffset(0);
    };
  }, [query, beverageTypeName]);

  const executeSearch = (
    query = "",
    staticFilters?: SelectableStaticFilter[],
    page = 1
  ) => {
    searchActions.setQuery(query);

    if (staticFilters) {
      searchActions.setStaticFilters(staticFilters);
    }

    searchActions.executeVerticalQuery().then((verticalQueryResponse) => {
      setDisplayableResults([
        ...displayableResults,
        ...verticalQueryResponse.verticalResults.results,
      ]);
    });
  };

  const renderSearchTitle = () => {
    if (beverageTypeName) {
      return <Text style={styles.titleText}>{beverageTypeName}</Text>;
    } else if (query) {
      return (
        <Text style={{ ...styles.titleText, color: "black" }}>
          <Text>{`Results for "${query}"`}</Text>
        </Text>
      );
    }
  };

  // TODO: move to separate component
  const renderBeverageResult = ({ item, index }) => {
    // the item has a primaryPhoto field, but it is not always populated. If it is check if primaryPhoto.image.thumbnails exists, if it does, find the smallest thumbnail in the list, otherwise use primaryPhoto.image.url

    const smallestThumbnail = item.rawData?.primaryPhoto?.image.thumbnails
      ? item.rawData?.primaryPhoto?.image.thumbnails?.reduce(
          (smallest, current) => {
            if (current.width < smallest.width) {
              return current;
            }
            return smallest;
          }
        )
      : item.rawData?.primaryPhoto?.image.url;

    return (
      <View style={{ flex: 1 / 2, height: 200, marginVertical: 12 }}>
        <View style={styles.beverageResultContainer}>
          <View
            style={{
              padding: 20,
              borderWidth: 1,
              borderRadius: 8,
            }}
          >
            <Image
              source={{ uri: smallestThumbnail.url }}
              resizeMode="contain"
              style={{ width: 120, height: 120 }}
              defaultSource={placeholderImg}
            />
            <Text numberOfLines={2}>{item.rawData?.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  const loadMoreItems = () => {
    // TODO: only execute query if there are more results to fetch
    if ((offset / limit) * limit < resultCount) {
      searchActions.setOffset(offset + limit);
      executeSearch();
    }
  };

  return (
    <View style={styles.container}>
      {/* TODO: add shadow to titleContainer */}
      <View>
        {renderSearchTitle()}
        {!isSearchLoading && resultCount && (
          <Text
            style={styles.resultCountText}
          >{`(${resultCount} results)`}</Text>
        )}
      </View>
      <FlatList
        data={displayableResults}
        keyExtractor={(item) => uuid()}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.3}
        renderItem={renderBeverageResult}
        numColumns={2}
        getItemLayout={(data, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}

        // TODO: add ListFooterComponent loader
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
  },
  // TODO: add shadow to titleContainer
  // titleContainer: {
  //   elevation: 4,
  //   shadowColor: "black",
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  // },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Sora_400Regular",
    color: Colors.primary.orange,
    paddingTop: 16,
    paddingBottom: 2,
    paddingHorizontal: 16,
  },
  resultCountText: {
    fontSize: 12,
    fontFamily: "Sora_400Regular",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  beverageResultContainer: {
    padding: 8,
    borderColor: "gray",
  },
});

export default SearchResultsScreen;
