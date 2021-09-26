import { useState } from 'react';

export function useImageUpload() {
  const [image, setImage] = useState();
  const [source, setSource] = useState('');
  const [file, setFile] = useState<File>();
  const [showBorder, setShowBorder] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    if (files && files.length) {
      const file = files.item(0);
      if (file) {
        setSource(URL.createObjectURL(file));
        setFile(file);
      }
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowBorder(false);
    const { files } = e.dataTransfer;
    const file = files.item(0);
    if (file) {
      setSource(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    setShowBorder(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    setShowBorder(false);
  };

  return {
    source,
    file,
    showBorder,
    onFileChange,
    onDrop,
    onDragOver,
    onDragLeave,
  };
}
