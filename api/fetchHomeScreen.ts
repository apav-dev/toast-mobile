import { CONTENT_API_KEY } from "@env";
import { HomeScreenApiResponse } from "../types/kg/home_screen";

export const fetchHomeScreen = async (): Promise<HomeScreenApiResponse> => {
  const requestString = `https://streams.yext.com/v2/accounts/me/api/fetchHomeScreen?api_key=75fcb4c0fdec8f3c001872acb958a7ba&v=20230101`;

  try {
    const response = await fetch(requestString);
    const data = await response.json();

    if (data.meta.errors.length > 0) {
      throw new Error(data.meta.errors[0].message);
    }

    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error(`"Failed to fetch the home screen`));
  }
};
