import { FontAwesome } from "react-native-vector-icons";

type SearchIconProps = {
  size?: number;
  color?: string;
};

const SearchIcon = ({ size, color }: SearchIconProps) => {
  return <FontAwesome name="search" size={size} color={color} />;
};

export default SearchIcon;
