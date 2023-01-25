/**
 * The type definition for a thumbnail.
 *
 * @public
 */
export declare type ThumbnailType = {
  height: number;
  width: number;
  url: string;
};
/**
 * The type definition for a complex image.
 *
 * @public
 */
export declare type ComplexImageType = {
  image: {
    alternateText?: string;
    height: number;
    width: number;
    url: string;
    thumbnails?: ThumbnailType[];
  };
};
/**
 * The type definition for an image.
 *
 * @public
 */
export declare type ImageType = {
  alternateText?: string;
  height: number;
  width: number;
  url: string;
};
