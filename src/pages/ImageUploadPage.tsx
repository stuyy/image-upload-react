import React, { useEffect, useRef, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { ClipLoader } from 'react-spinners';
import { ImageOptions } from '../components/ImageOptions';
import { ImagePreview } from '../components/ImagePreview';
import { ImageUpload } from '../components/ImageUpload';
import { Spinner } from '../components/Spinner';
import {
  Button,
  Container,
  FileInput,
  Flex,
  ImageUploadContainer,
  Label,
  Page,
  Text,
} from '../styles';
import { postUploadImage } from '../utils/api';

export const ImageUploadPage = () => {
  const imageUploadRef = useRef<HTMLDivElement>(null);
  const [showBorder, setShowBorder] = useState(false);
  const [source, setSource] = useState('');
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();

  const isDisabled = () => loading || !file;

  const reset = () => {
    setFile(undefined);
    setSource('');
    formRef.current?.reset();
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
      const fileInput = formRef.current?.childNodes.item(2) as HTMLInputElement;
      fileInput.click();
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

  return (
    <Page
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex
    >
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
          <form ref={formRef}>
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
              onChange={handleFileChange}
            />
          </form>
          {source && <ImagePreview source={source} reset={reset} />}
        </ImageUploadContainer>
        {file && <ImageOptions />}
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
    </Page>
  );
};
