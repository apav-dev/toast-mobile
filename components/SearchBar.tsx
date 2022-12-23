import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { useSearchState, useSearchActions } from "@yext/search-headless-react";

type SearchBarProps = {
  placeholder?: string;
};

const SearchBar = ({ placeholder }: SearchBarProps) => {
  const inputRef = useRef<TextInput>(null);

  const searchActions = useSearchActions();

  const [isFocused, setIsFocused] = useState(false);

  const queryInput = useSearchState((state) => state.query.input);

  const handleFocusSearch = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  const handleCancelSearch = () => {
    inputRef.current!.blur();
    setIsFocused(false);
  };

  const handleTextChange = (text: string) => {
    searchActions.setQuery(text);
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            isFocused ? styles.inputFocused : styles.inputBlurred,
          ]}
          onFocus={handleFocusSearch}
          placeholder={placeholder}
          value={queryInput}
          onChangeText={handleTextChange}
        />
        {isFocused && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelSearch}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
      {isFocused && (
        <TouchableWithoutFeedback onPress={handleCancelSearch}>
          <View style={styles.noAutocomplete} />
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  noAutocomplete: {
    flex: 1,
    backgroundColor: "gray",
  },
  input: {
    flex: 1,
    height: 30,
    paddingHorizontal: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
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
    fontSize: 20,
  },
});

export default SearchBar;
