import React, { useRef, useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { ClipLoader } from 'react-spinners';
import { ImageOptions } from '../components/ImageOptions';
import { ImagePreview } from '../components/ImagePreview';
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
import { defaultImageOptions } from '../utils/constants';
import { useImageUpload } from '../utils/hooks';
import { ImageOptionsType } from '../utils/types';

export const ImageUploadPage = () => {
  const imageUploadRef = useRef<HTMLDivElement>(null);
  const { image, setImage, handlers } = useImageUpload();
  const { source, file, hover } = image;
  const { onFileChange, onDrop, onDragLeave, onDragOver } = handlers;
  const [imageOptions, setImageOptions] =
    useState<ImageOptionsType>(defaultImageOptions);
  const { isNSFW, isProtected, password } = imageOptions;
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const history = useHistory();
  const isDisabled = () => loading || !file;
  const reset = () => {
    const newState = {
      isNSFW: false,
      isProtected: false,
      password: '',
      error: '',
    };
    setImage({ file: undefined, source: '', hover: false });
    setImageOptions(newState);
    formRef.current?.reset();
  };

  const checkImagePassword = () => {
    if (imageOptions.isProtected) {
      if (!imageOptions.password) {
        const error = 'Password Required';
        setImageOptions((prevState) => ({ ...prevState, error }));
        return false;
      }
    }
    setImageOptions((prevState) => ({ ...prevState, error: '' }));
    return true;
  };

  const uploadImage = async () => {
    if (!file) return;
    if (checkImagePassword()) {
      try {
        setLoading(true);
        const data = new FormData();
        data.append('file', file);
        data.append('isNSFW', `${isNSFW}`);
        data.append('isProtected', `${isProtected}`);
        data.append('password', `${password}`);
        if (isProtected) {
          localStorage.setItem('showImageResult', JSON.stringify(true));
          localStorage.setItem('imagePassword', password);
        }
        const { data: key } = await postUploadImage(data);
        history.push(`/img/${key}`);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      console.log(
        'Image Password was set to true, but no password was specified.'
      );
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === imageUploadRef.current) {
      const fileInput = formRef.current?.childNodes.item(2) as HTMLInputElement;
      fileInput.click();
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
          showBorder={hover}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
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
              onChange={onFileChange}
            />
          </form>
          {source && <ImagePreview source={source} reset={reset} />}
        </ImageUploadContainer>
        {file && (
          <ImageOptions
            imageOptions={imageOptions}
            setImageOptions={setImageOptions}
          />
        )}
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
