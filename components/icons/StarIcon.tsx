import { FontAwesome } from "react-native-vector-icons";

function StarIcon(props) {
  return (
    <FontAwesome
      name="star"
      size={props.size || 30}
      color={props.color || "orange"}
    />
  );
}

export default StarIcon;
