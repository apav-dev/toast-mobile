import { FontAwesome } from "react-native-vector-icons";
import Colors from "../../styles/colors";

type HalfStarIconProps = {
  size?: number;
  color?: string;
};

function HalfStarIcon(props: HalfStarIconProps) {
  return (
    <FontAwesome
      name="star-half"
      size={props.size || 30}
      color={props.color || Colors.primary.orange}
    />
  );
}

export default HalfStarIcon;
