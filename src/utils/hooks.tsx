import { useState } from 'react';
import { defaultImage } from './constants';
import { ImageType } from './types';

export function useImageUpload() {
  const [image, setImage] = useState<ImageType>(defaultImage);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    if (files && files.length) {
      const file = files.item(0);
      if (file) {
        const source = URL.createObjectURL(file);
        setImage((prevState) => ({ ...prevState, source, file }));
      }
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setImage((prevState) => ({ ...prevState, hover: false }));
    const { files } = e.dataTransfer;
    const file = files.item(0);
    if (file) {
      const source = URL.createObjectURL(file);
      setImage((prevState) => ({ ...prevState, source, file }));
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    setImage((prevState) => ({ ...prevState, hover: true }));
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    setImage((prevState) => ({ ...prevState, hover: false }));
  };

  return {
    image,
    setImage,
    handlers: {
      onFileChange,
      onDrop,
      onDragOver,
      onDragLeave,
    },
  };
}
