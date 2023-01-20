import React from "react";
import { FlatList } from "react-native";
import BeverageVariant from "./BeverageVariant";
import { BeverageVariant as BV } from "../types/kg/beverage";

type BeverageVariantListProps = {
  variants: BV[];
};

const BeverageVariantList = ({ variants }: BeverageVariantListProps) => {
  return (
    <FlatList
      contentContainerStyle={{
        paddingHorizontal: 10,
      }}
      data={variants}
      keyExtractor={(variant) => variant.id}
      renderItem={({ item }) => <BeverageVariant variant={item} />}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default BeverageVariantList;
