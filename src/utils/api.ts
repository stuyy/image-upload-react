import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const postUploadImage = (data: FormData) =>
  axios.post(`${API_URL}/image/create`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getUploadedImage = (key: string) =>
  axios.get(`${API_URL}/image/${key}`);
