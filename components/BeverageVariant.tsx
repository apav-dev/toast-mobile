import { View, Text } from "react-native";
import { BeverageVariant as BV } from "../types/kg/beverage";

type BeverageVariantProps = {
  variant: BV;
};

const BeverageVariant = ({ variant }: BeverageVariantProps) => {
  const formatSize = (size: string) => {
    // size is a string like 6-pack. convert to 6x
    const sizeNumber = size.split("-")[0];
    return `${sizeNumber}x`;
  };

  return (
    <View
      style={{
        flexDirection: "column",
        padding: 10,
        borderWidth: 1,
        marginHorizontal: 8,
        width: 100,
        height: 75,
      }}
    >
      <Text style={{ fontSize: 20 }}>{formatSize(variant.size)}</Text>
      <Text>{variant.c_price}</Text>
    </View>
  );
};

export default BeverageVariant;
