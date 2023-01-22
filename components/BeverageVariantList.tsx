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
      style={{
        maxHeight: 100,
        flexDirection: "row",
        backgroundColor: "white",
        paddingBottom: 8,
      }}
      contentContainerStyle={{
        paddingHorizontal: 8,
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
