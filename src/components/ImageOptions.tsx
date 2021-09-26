import React from 'react';
import {
  Checkbox,
  Flex,
  ImageOptionsContainer,
  InputContainer,
  InputErrorMessage,
  InputLabel,
  PasswordField,
} from '../styles';
import { ImageOptionsType } from '../utils/types';

type ImageOptionsProps = {
  imageOptions: ImageOptionsType;
  setImageOptions: React.Dispatch<React.SetStateAction<ImageOptionsType>>;
};

export const ImageOptions = (props: ImageOptionsProps) => {
  const { imageOptions, setImageOptions } = props;
  const { isNSFW, isProtected, password, error } = imageOptions;
  return (
    <div>
      <ImageOptionsContainer>
        <Flex alignItems="center" style={{ marginLeft: '20px' }}>
          <Checkbox
            id="nsfw-check"
            type="checkbox"
            checked={isNSFW}
            onChange={({ target: { checked: isNSFW } }) =>
              setImageOptions((prevState) => ({ ...prevState, isNSFW }))
            }
          />
          <label
            htmlFor="nsfw-check"
            style={{ fontWeight: 'bold', marginLeft: '8px' }}
          >
            NSFW
          </label>
        </Flex>
        <Flex alignItems="center" style={{ marginLeft: '20px' }}>
          <Checkbox
            id="protected-check"
            type="checkbox"
            checked={isProtected}
            onChange={({ target: { checked: isProtected } }) =>
              setImageOptions((prevState) => ({
                ...prevState,
                isProtected,
                error: '',
              }))
            }
          />
          <label
            htmlFor="protected-check"
            style={{ fontWeight: 'bold', marginLeft: '8px' }}
          >
            Private
          </label>
        </Flex>
      </ImageOptionsContainer>
      {isProtected && (
        <InputContainer style={{ marginTop: '10px' }} error={error}>
          <Flex justifyContent="space-between">
            <InputLabel htmlFor="password" children="Password" />
            {error && <InputErrorMessage children={error} />}
          </Flex>
          <PasswordField
            id="password"
            type="password"
            value={password}
            onChange={({ target: { value: password } }) =>
              setImageOptions((prevState) => ({ ...prevState, password }))
            }
          />
        </InputContainer>
      )}
    </div>
  );
};
