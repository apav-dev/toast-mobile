import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Typography from "../styles/typography";
import { BeverageVariant as BV } from "../types/kg/beverage";

type BeverageVariantProps = {
  variant: BV;
  onVariantPress?: (variant: BV) => void;
};

const BeverageVariant = ({ variant, onVariantPress }: BeverageVariantProps) => {
  const formatSize = (size: string) => {
    // size is a string like 6-pack. convert to 6x
    const sizeNumber = size.split("-")[0];
    return `${sizeNumber}x`;
  };

  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 4,
        paddingVertical: 8,
        borderWidth: 1,
        marginHorizontal: 8,
        width: 100,
      }}
      onPress={() => (onVariantPress ? onVariantPress(variant) : null)}
    >
      <Text style={styles.sizeText}>{formatSize(variant.size)}</Text>
      <Text style={styles.containerTypeText}>{variant.c_containerType}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sizeText: {
    ...Typography.fontSize.x30,
    fontFamily: Typography.fontFamily.semiBold,
  },
  containerTypeText: {
    ...Typography.fontSize.x10,
    fontFamily: Typography.fontFamily.regular,
  },
});

export default BeverageVariant;
