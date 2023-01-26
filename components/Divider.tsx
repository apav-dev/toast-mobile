import { View, StyleSheet, ViewStyle } from "react-native";
import Colors from "../styles/colors";

type DividerProps = {
  style?: ViewStyle;
};

const Divider = ({ style }: DividerProps) => {
  return <View style={{ ...styles.divider, ...style }} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.s100,
  },
});

export default Divider;
