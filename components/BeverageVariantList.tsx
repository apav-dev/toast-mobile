import React from "react";
import { FlatList } from "react-native";
import BeverageVariant from "./BeverageVariant";
import { BeverageVariant as BV } from "../types/kg/beverage";
import { v4 as uuid } from "uuid";

type BeverageVariantListProps = {
  variants: BV[];
  selectedVariantId?: string;
  onVariantPress?: (variant: BV) => void;
};

const BeverageVariantList = ({
  variants,
  selectedVariantId,
  onVariantPress,
}: BeverageVariantListProps) => {
  return (
    <FlatList
      style={{
        maxHeight: 100,
        flexDirection: "row",
        backgroundColor: "white",
        paddingBottom: 8,
      }}
      contentContainerStyle={{
        paddingHorizontal: 8,
      }}
      data={variants.sort((a, b) => {
        if (a.c_containerType === b.c_containerType) {
          return Number(a.c_price) - Number(b.c_price);
        } else {
          return a.c_containerType === "Can" ? -1 : 1;
        }
      })}
      keyExtractor={() => uuid()}
      renderItem={({ item }) => (
        <BeverageVariant
          variant={item}
          selectedVariantId={selectedVariantId}
          onVariantPress={onVariantPress}
        />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default BeverageVariantList;
