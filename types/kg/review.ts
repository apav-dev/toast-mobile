import ContentApiResponse from "./content_api";

type Review = {
  $key: {
    locale: string;
    primary_key: string;
  };
  authorName: string;
  content: string;
  entity: {
    id: string;
  };
  rating: number;
  reviewDate: string;
};

export default Review;

// type that exteneds ContentApiResponse<Review> to include a score field
export type ReviewApiResponse = ContentApiResponse<Review> & {
  rating: number;
};
