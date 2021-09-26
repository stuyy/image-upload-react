export type ImageOptionsType = {
  isNSFW: boolean;
  isProtected: boolean;
  password: string;
  error: string;
};

export type ImageType = {
  source: string;
  file: File | undefined;
  hover: boolean;
};

export type ImageReferenceType = {
  id: number;
  imageId: string;
  etag: string;
  isNSFW: boolean;
  isProtected: boolean;
  password: string;
};
