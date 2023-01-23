import { CONTENT_API_KEY } from "@env";
import { ReviewApiResponse } from "../types/kg/review";

export const fetchReviews = async (
  id: string,
  limit = 10,
  params?: Record<string, string | number>,
  pageToken?: string
): Promise<ReviewApiResponse> => {
  let requestString = `https://streams.yext.com/v2/accounts/me/api/fetchReviews?api_key=${CONTENT_API_KEY}&v=20221114&entity.id=${id}`;
  if (pageToken) {
    requestString += `&pageToken=${pageToken}`;
  }
  if (limit) {
    requestString += `&limit=${limit}`;
  }
  if (params) {
    Object.keys(params).forEach((key) => {
      requestString += `&${key}=${params[key]}`;
    });
  }
  try {
    const response = await fetch(requestString);
    const data = await response.json();

    if (data.meta.errors.length > 0) {
      throw new Error(data.meta.errors[0].message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(
      new Error(`"Failed to get reviews for beverage ${id}: ${error}`)
    );
  }
};
