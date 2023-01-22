import { View, Text, StyleSheet } from "react-native";
import { Colors, Typography } from "../App";

type DetailsTableProps = {
  title?: string;
  data: string[][];
};

const DetailsTable = ({ data, title }: DetailsTableProps) => {
  return (
    <>
      <Text style={styles.headingText}>{title}</Text>
      {data.map((row, index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          <View
            style={{
              ...styles.labelContainer,
              borderTopWidth: index === 0 ? 1 : 0,
            }}
          >
            <Text
              style={{
                color: Colors.neutral.s300,
                fontFamily: Typography.fontFamily.regular,
              }}
            >
              {row[0].toLocaleUpperCase()}
            </Text>
          </View>
          <View
            style={{
              ...styles.valueContainer,
              borderTopWidth: index === 0 ? 1 : 0,
            }}
          >
            <Text
              style={{
                fontFamily: Typography.fontFamily.regular,
                color: Colors.neutral.s700,
              }}
            >
              {row[1]}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
};

export default DetailsTable;

const styles = StyleSheet.create({
  headingText: {
    fontFamily: Typography.fontFamily.semiBold,
    paddingLeft: 12,
    paddingVertical: 8,
    // fontSize: Typography.fontSize.x40,
    fontSize: 19,
    color: Colors.neutral.s900,
  },
  labelContainer: {
    width: "30%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.neutral.s200,
    backgroundColor: Colors.neutral.s100,
    paddingLeft: 12,
    paddingVertical: 4,
  },
  valueContainer: {
    width: "70%",
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.neutral.s200,
    paddingLeft: 12,
    padding: 4,
  },
});
