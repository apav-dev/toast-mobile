import Section from "./Section";
import { Text, StyleSheet, View } from "react-native";
import { Colors, Typography } from "../App";

const ReviewsSection = () => {
  return (
    <Section>
      <Text style={styles.headingText}>Reviews</Text>
      <View style={{ paddingVertical: 16 }}></View>
    </Section>
  );
};

const styles = StyleSheet.create({
  headingText: {
    // fontFamily: Typography.fontFamily.semiBold,
    fontFamily: "Sora_600SemiBold",
    paddingLeft: 12,
    paddingVertical: 8,
    // fontSize: Typography.fontSize.x40,
    fontSize: 19,
    color: Colors.neutral.s900,
  },
});

export default ReviewsSection;
