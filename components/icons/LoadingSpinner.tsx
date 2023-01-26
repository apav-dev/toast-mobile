import { Animated, Easing } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import Colors from "../../styles/colors";

type LoadingSpinner = {
  size?: number;
  color?: string;
};

function LoadingSpinner(props: LoadingSpinner) {
  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    })
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <FontAwesome
        name="spinner"
        size={props.size || 15}
        color={props.color || Colors.primary.orange}
      />
    </Animated.View>
  );
}

export default LoadingSpinner;
