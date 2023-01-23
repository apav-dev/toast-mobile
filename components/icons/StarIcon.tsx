import { FontAwesome } from "react-native-vector-icons";
import Colors from "../../styles/colors";

type StarIconProps = {
  size?: number;
  color?: string;
};

function StarIcon(props: StarIconProps) {
  return (
    <FontAwesome
      name="star"
      size={props.size || 30}
      color={props.color || Colors.primary.orange}
    />
  );
}

export default StarIcon;
