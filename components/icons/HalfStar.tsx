import { FontAwesome } from "react-native-vector-icons";

function HalfStarIcon(props) {
  return (
    <FontAwesome
      name="star-half"
      size={props.size || 30}
      color={props.color || "orange"}
    />
  );
}

export default HalfStarIcon;
