export type ImageOptionsType = {
  isNSFW: boolean;
  isProtected: boolean;
  password: string;
  error: string;
};

export type ImageType = {
  source: string;
  file: File;
  hover: boolean;
};
