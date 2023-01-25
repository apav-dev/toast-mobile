import { StyleSheet, Text } from "react-native";
import Colors from "../styles/colors";
import Typography from "../styles/typography";

type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title }: SectionTitleProps) => {
  return <Text style={styles.text}>{title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Typography.fontFamily.semiBold,
    paddingLeft: 12,
    paddingVertical: 8,
    ...Typography.fontSize.x40,
    color: Colors.neutral.s900,
  },
});

export default SectionTitle;
