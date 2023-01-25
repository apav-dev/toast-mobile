import { ComplexImageType, ThumbnailType } from "./image";

export type BeverageVariant = {
  c_containerType?: string;
  c_price?: string;
  id?: string;
  name?: string;
  primaryPhoto?: {
    image?: ThumbnailType;
  };
  size?: string;
};

type Beverage = {
  $key: {
    locale?: string;
    primary_key?: string;
  };
  c_abv?: string;
  c_beverageCategories?: Array<{
    name?: string;
    c_parentCategory?: Array<{
      name?: string;
    }>;
  }>;
  c_originCountry?: string;
  c_rating?: string;
  c_usState?: string;
  c_variantBeverages?: Array<BeverageVariant>;
  description?: string;
  id: string;
  name: string;
  primaryPhoto?: {
    image?: ThumbnailType;
  };
  ref_reviewsAgg?: Array<{
    averageRating?: number;
    reviewCount?: number;
  }>;
};

export default Beverage;
