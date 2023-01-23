import { View, StyleSheet, ViewStyle } from "react-native";
import Colors from "../styles/colors";

type SectionProps = {
  children?: React.ReactNode;
  sectionStyles?: ViewStyle;
};

const Section = ({ children, sectionStyles }: SectionProps) => {
  return (
    <View style={{ ...styles.sectionContainer, ...sectionStyles }}>
      {children}
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: Colors.neutral.white,
  },
});
