import { FontAwesome } from "react-native-vector-icons";
import Colors from "../../styles/colors";

type LocationArrowIconProps = {
  size?: number;
  color?: string;
};

function LocationArrowIcon(props: LocationArrowIconProps) {
  return (
    <FontAwesome
      name="location-arrow"
      size={props.size || 15}
      color={props.color || Colors.primary.orange}
    />
  );
}

export default LocationArrowIcon;
