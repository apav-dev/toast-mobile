type ContentApiResponse<T> = {
  meta: {
    uuid: string;
    errors: any[];
  };
  response: {
    docs: T[];
    count: number;
  };
};

export default ContentApiResponse;
