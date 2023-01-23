import * as React from "react";
import { View } from "react-native";
import { v4 as uuid } from "uuid";
import HalfStarIcon from "./icons/HalfStarIcon";
import StarIcon from "./icons/StarIcon";

interface StarRatingProps {
  rating: number;
  starSize?: number;
  color?: string;
}

const StarRating = ({ rating, starSize, color }: StarRatingProps) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(Math.floor(rating))].map((_) => (
        <StarIcon key={uuid()} size={starSize} color={color} />
      ))}
      {rating % 1 >= 0.5 && <HalfStarIcon size={starSize} color={color} />}
    </View>
  );
};

export default StarRating;
