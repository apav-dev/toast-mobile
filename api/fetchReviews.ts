import { CONTENT_API_KEY } from "@env";
import ContentApiResponse from "../types/kg/content_api";
import Review, { ReviewApiResponse } from "../types/kg/review";

export const fetchReviews = async (
  id: string,
  rating: number
): Promise<ReviewApiResponse> => {
  try {
    const response = await fetch(
      `https://streams.yext.com/v2/accounts/me/api/fetchReviews?api_key=75fcb4c0fdec8f3c001872acb958a7ba&v=20221114&entity.id=${id}&rating=${rating}`
    );
    const data = await response.json();

    if (data.meta.errors.length > 0) {
      throw new Error(data.meta.errors[0].message);
    }

    return { ...data, rating };
  } catch (error) {
    console.error(error);
    return Promise.reject(
      new Error(`"Failed to get reviews for rating ${rating}: ${error}`)
    );
  }
};
