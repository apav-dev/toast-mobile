type ContentApiResponse<T> = {
  meta: {
    uuid: string;
    errors: any[];
  };
  response: {
    docs: T[];
    count: number;
  };
  count: number;
  nextPageToken?: string;
};

export default ContentApiResponse;
