import ContentApiResponse from "./content_api";
import { ComplexImageType } from "./image";

export declare type HomeScreen = {
  name: string;
  c_featuredCollections: {
    name: string;
    c_associatedBeverages: {
      name: string;
      primaryPhoto: {
        image: {
          url: string;
        };
      };
    }[];
  }[];
  c_featuredCategories: {
    name: string;
    c_mobileIcon: ComplexImageType;
  }[];
};

export declare type HomeScreenApiResponse = ContentApiResponse<HomeScreen>;
