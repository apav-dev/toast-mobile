import Beverage from "../types/kg/beverage";
import ContentApiResponse from "../types/kg/content_api";
import { CONTENT_API_KEY } from "@env";

export const getBeverageByName = async (
  name: string
): Promise<ContentApiResponse<Beverage>> => {
  const response = await fetch(
    `https://streams.yext.com/v2/accounts/me/api/getBeverageByID?api_key=75fcb4c0fdec8f3c001872acb958a7ba&v=20230101&name=${name}`
  );
  const data = await response.json();

  return data;
};
