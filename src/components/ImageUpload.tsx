import React, { useRef, useState } from 'react';
import {
  Button,
  Container,
  FileInput,
  Flex,
  ImageUploadContainer,
  Label,
  Text,
} from '../styles';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { ImagePreview } from './ImagePreview';
import { postUploadImage } from '../utils/api';
import { useHistory } from 'react-router';
import { Spinner } from './Spinner';
import { ClipLoader } from 'react-spinners';

export const ImageUpload = () => {
  const imageUploadRef = useRef<HTMLDivElement>(null);
  const [showBorder, setShowBorder] = useState(false);
  const [source, setSource] = useState('');
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const isDisabled = () => loading || !file;

  const reset = () => {
    setFile(undefined);
    setSource('');
  };

  const uploadImage = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const data = new FormData();
      data.append('file', file);
      const { data: key } = await postUploadImage(data);
      history.push(`/img/${key}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === imageUploadRef.current) {
      fileInputRef.current?.click();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    setShowBorder(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    setShowBorder(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length) {
      const file = files.item(0);
      if (file) {
        setSource(URL.createObjectURL(file));
        setFile(file);
      }
    }
  };

  return (
    <Container>
      {loading && <Spinner children={<ClipLoader color="#fff" />} />}
      <ImageUploadContainer
        ref={imageUploadRef}
        showBorder={showBorder}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div>
          <Label
            htmlFor="file"
            children="Upload Image"
            onClick={(e) => e.preventDefault()}
          />
          <Text children="Click to upload a file or drag the image here" />
          <FileInput
            id="file"
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        {source && <ImagePreview source={source} reset={reset} />}
      </ImageUploadContainer>

      <Button
        style={{ margin: '10px 0' }}
        onClick={uploadImage}
        disabled={isDisabled()}
      >
        <Flex alignItems="center" justifyContent="center">
          <IoCloudUploadOutline size={35} />
        </Flex>
      </Button>
    </Container>
  );
};
