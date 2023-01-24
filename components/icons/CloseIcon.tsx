import { FontAwesome } from "react-native-vector-icons";

type CloseIconProps = {
  size?: number;
  color?: string;
};

const CloseIcon = ({ size, color }: CloseIconProps) => {
  return <FontAwesome name="close" size={size} color={color} />;
};

export default CloseIcon;
