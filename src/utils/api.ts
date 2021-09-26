import axios from 'axios';
import { ImageReferenceType } from './types';

const API_URL = 'http://localhost:3001/api';

export const postUploadImage = (data: FormData) =>
  axios.post(`${API_URL}/image/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getProtectedImage = (imageId: string, password: string) =>
  axios.post(
    `${API_URL}/image/${imageId}`,
    { password },
    { responseType: 'arraybuffer' }
  );

export const getImageReference = (imageId: string) =>
  axios.get<ImageReferenceType>(`${API_URL}/image/${imageId}/reference`);
