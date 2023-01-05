import { HighlightedValue } from "@yext/search-headless-react";
import { Text, StyleSheet, TextStyle } from "react-native";

/**
  The CSS class interface for {@link renderHighlightedValue}.
  @public
*/
export interface HighlightedValueCssClasses {
  highlighted?: TextStyle;
  nonHighlighted?: TextStyle;
}

/**
  Renders a HighlightedValue with highlighting based on its matchedSubstrings.
  @returns JSX.Element
  @public
  @param highlightedValueOrString - the text to add highlight to.
  @param customCssClasses - css classes use for the non-highlighted and highlighted text.
*/
export function renderHighlightedValue(
  highlightedValueOrString: Partial<HighlightedValue> | string,
  customCssClasses?: HighlightedValueCssClasses
): JSX.Element {
  const { value = "", matchedSubstrings } =
    typeof highlightedValueOrString === "string"
      ? { value: highlightedValueOrString, matchedSubstrings: [] }
      : highlightedValueOrString;
  const cssClasses = { ...styles, ...customCssClasses };
  if (!matchedSubstrings || matchedSubstrings.length === 0) {
    return <Text>{value}</Text>;
  }
  const substrings = [...matchedSubstrings];
  substrings.sort((a, b) => a.offset - b.offset);
  const highlightedJSX: JSX.Element[] = [];
  let curr = 0;
  for (const { offset, length } of substrings) {
    if (offset > curr) {
      highlightedJSX.push(
        <Text key={curr} style={cssClasses.nonHighlighted}>
          {value.substring(curr, offset)}
        </Text>
      );
    }
    highlightedJSX.push(
      <Text key={offset} style={cssClasses.highlighted}>
        {value.substring(offset, offset + length)}
      </Text>
    );
    curr = offset + length;
  }
  if (curr < value.length) {
    highlightedJSX.push(
      <Text key={curr} style={cssClasses.nonHighlighted}>
        {value.substring(curr)}
      </Text>
    );
  }
  return <Text numberOfLines={2}>{highlightedJSX}</Text>;
}

const styles = StyleSheet.create({
  highlighted: {
    fontWeight: "400",
  },
  nonHighlighted: {
    fontWeight: "bold",
  },
});
