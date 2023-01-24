import { FontAwesome } from "react-native-vector-icons";

type FilterIconProps = {
  size?: number;
  color?: string;
};

const FilterIcon = ({ size, color }: FilterIconProps) => {
  return <FontAwesome name="filter" size={size} color={color} />;
};

export default FilterIcon;
