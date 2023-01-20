import * as React from "react";
import { View } from "react-native";
import { v4 as uuid } from "uuid";
import HalfStarIcon from "./icons/HalfStar";
import StarIcon from "./icons/StarIcon";

interface StarRatingProps {
  rating: number;
  starSize?: number;
  starColor?: string;
}

const StarRating = ({ rating, starSize, starColor }: StarRatingProps) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {[...Array(Math.floor(rating))].map((_) => (
        <StarIcon key={uuid()} size={starSize} starColor={starColor} />
      ))}
      {rating % 1 >= 0.5 && (
        <HalfStarIcon starSize={starSize} starColor={starColor} />
      )}
    </View>
  );
};

export default StarRating;
