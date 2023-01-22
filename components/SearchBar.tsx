import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import {
  useSearchActions,
  SearchParameterField,
  FilterSearchResponse,
  AutocompleteResult,
} from "@yext/search-headless-react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSynchronizedRequest } from "../hooks/useSynchronizedRequest";

type SearchBarProps = {
  /**
   * The search input's placeholder text when no text has been entered by the user.
   * Defaults to "Search here...".
   */
  placeholder?: string;
  /**
   * Whether or not to disable autocomplete suggestions.
   */
  disableAutocomplete?: boolean;
  /**
   * An array of SearchParameterField values to run a filter search request for autocomplete suggestions.
   */
  filterSearchFields?: {
    searchParameterField: SearchParameterField;
    removeDuplicates?: boolean;
  }[];

  /** A function that renders the autocomplete suggestions. */
  renderEntityPreviews?: RenderEntityPreviews;

  /** A function that is called when the user submits a search. */
  // TODO: add default function that executes a search
  onSearch?: (query: string) => void;
};

export type RenderEntityPreviews = (
  sections: {
    /** label will only have value if the sectioned prop equals true*/
    label?: string;
    results: AutocompleteResult[];
  }[]
) => JSX.Element | null;

/**
 * 1. add prop that takes a function that renders the autocomplete suggestions. Results will be filtered before this is called
 * 2. Call and render autocomplete suggestions if filter search fields are not provided
 * 3. Show popular searches if no input is provided using an API call
 * 4. Show recent searches if no input is provided
 * 5. Show loading icon when search is loading
 */

const SearchBar = ({
  placeholder,
  disableAutocomplete,
  filterSearchFields,
  renderEntityPreviews,
  onSearch,
}: SearchBarProps) => {
  const inputRef = useRef<TextInput>(null);

  const searchActions = useSearchActions();

  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");

  // search bar animation
  const width = useRef(new Animated.Value(0)).current;
  const widthAnim = width.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "80%"],
  });
  useEffect(() => {
    Animated.timing(width, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  useEffect(() => {
    if (input.length === 0) {
      clearFilterSearchResponse();
    }
  }, [input]);

  const [filterSearchResponse, executeFilterSearch, clearFilterSearchResponse] =
    useSynchronizedRequest<string, FilterSearchResponse>(
      (inputValue) => {
        // setFilterQuery(inputValue);
        return searchActions.executeFilterSearch(
          input,
          // filter results will always be sectioned
          true,
          filterSearchFields.map((field) => field.searchParameterField)
        );
      },
      (e) =>
        console.error("Error occured executing a filter search request.\n", e)
    );

  const handleFocusSearch = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  const handleCancelSearch = () => {
    inputRef.current!.blur();
    setIsFocused(false);
    setInput("");
    searchActions.setQuery("");
    clearFilterSearchResponse();
  };

  const handleTextChange = (text: string) => {
    setInput(text);
    searchActions.setQuery(text);
    if (!disableAutocomplete && text.length > 0) {
      if (filterSearchFields) {
        executeFilterSearch(text);
      } else {
        searchActions.executeVerticalAutocomplete();
        searchActions.executeVerticalQuery();
      }
    }
  };

  const filterSearchResults = useMemo(() => {
    if (filterSearchFields && filterSearchResponse?.sections.length > 0) {
      const removeDuplicateKeys = filterSearchFields
        .filter((field) => field.removeDuplicates)
        .map((field) => field.searchParameterField.fieldApiName);
      const sections: {
        label?: string;
        results: AutocompleteResult[];
      }[] = [];

      filterSearchResponse?.sections?.forEach((section) => {
        const removeDups = removeDuplicateKeys.includes(
          section.results?.[0].key
        );

        if (removeDups) {
          const results = section.results?.filter((result, index, self) => {
            return self.findIndex((r) => r.value === result.value) === index;
          });
          sections.push({ label: section.label, results: results });
        } else {
          sections.push(section);
        }
      });

      return sections;
    }
    return [];
  }, [filterSearchResponse]);

  const storeRecentSearches = async (search: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem("recentSearches");
      const recentSearches = jsonValue != null ? JSON.parse(jsonValue) : [];
      recentSearches.push(search);
      const uniqueRecentSearches = recentSearches.filter(
        (search, index, self) => self.indexOf(search) === index
      );
      const jsonRecentSearches = JSON.stringify(uniqueRecentSearches);
      await AsyncStorage.setItem("recentSearches", jsonRecentSearches);
    } catch (e) {
      console.error("Error saving recent searches.\n", e);
    }
  };

  const fetchRecentSearches = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("recentSearches");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Error fetching recent searches.\n", e);
    }
  };

  const renderAutocompleteSuggestions = () => {
    if (filterSearchFields && filterSearchResults.length > 0) {
      if (renderEntityPreviews) {
        renderEntityPreviews(filterSearchResults);
      } else {
        return filterSearchResults.map((section) => {
          return (
            <View style={styles.autocompleteSection}>
              <Text style={{ fontWeight: "bold", paddingBottom: 8 }}>
                {section.label}
              </Text>
              <View style={{ paddingLeft: 8 }}>
                {section.results.map((result) => {
                  return (
                    <Text style={{ paddingVertical: 2 }}>{result.value}</Text>
                  );
                })}
              </View>
            </View>
          );
        });
      }
    } else {
      // TODO: render autocomplete results
    }
    return null;
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(input);
    }
  };

  return (
    <>
      <View style={styles.searchBarContainer}>
        <Animated.View
          style={[
            styles.inputContainer,
            isFocused ? styles.inputFocused : styles.inputBlurred,
            {
              width: widthAnim,
            },
          ]}
        >
          <TextInput
            style={styles.inputText}
            ref={inputRef}
            onFocus={handleFocusSearch}
            placeholder={placeholder}
            value={input}
            onChangeText={handleTextChange}
            returnKeyType={onSearch ? "search" : "done"}
            onSubmitEditing={handleSearch}
          />
        </Animated.View>
        {isFocused && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelSearch}
          >
            <Animated.Text
              style={[styles.cancelButtonText, { opacity: isFocused ? 1 : 0 }]}
            >
              Cancel
            </Animated.Text>
          </TouchableOpacity>
        )}
      </View>
      {/* {isFocused && !filterSearchResponse && (
        <TouchableWithoutFeedback onPress={handleCancelSearch}>
          <View style={styles.noAutocomplete} />
        </TouchableWithoutFeedback>
      )} */}
      {filterSearchResponse && (
        <View style={styles.autocompleteContainer}>
          {/* <View style={{ height: 96, backgroundColor: "black" }}></View> */}
          {renderEntityPreviews(filterSearchResults)}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  inputContainer: {
    height: 30,
    paddingHorizontal: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    justifyContent: "center",
    fontFamily: "Sora_400Regular",
  },
  inputText: {
    fontFamily: "Sora_400Regular",
  },
  autocompleteContainer: {
    flex: 1,
  },
  autocompleteSection: {
    padding: 8,
    fontFamily: "Sora_400Regular",
  },
  noAutocomplete: {
    flex: 1,
    backgroundColor: "gray",
  },
  inputFocused: {
    borderColor: "#333",
  },
  inputBlurred: {
    borderColor: "black",
  },
  cancelButton: {
    marginLeft: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: "Sora_400Regular",
    color: "orange",
  },
});

export default SearchBar;
