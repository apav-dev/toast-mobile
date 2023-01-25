import { View, StyleSheet } from "react-native";
import Colors from "../styles/colors";

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.neutral.s100,
  },
});

export default Divider;
