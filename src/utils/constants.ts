import { ImageOptionsType, ImageType } from './types';

export const defaultImageOptions: ImageOptionsType = {
  isNSFW: false,
  isProtected: false,
  password: '',
  error: '',
};

export const defaultImage: ImageType = {
  source: '',
  file: undefined,
  hover: false,
};

export const SPACES_URL = 'https://imguploader.nyc3.digitaloceanspaces.com';
