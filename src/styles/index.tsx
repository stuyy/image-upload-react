import styled, { css } from 'styled-components';
import { fadeIn } from './keyframes';

export type ImageUploadContainerProps = {
  showBorder?: boolean;
};

export const ImageUploadContainer = styled.div<ImageUploadContainerProps>`
  width: 800px;
  background-color: #303030;
  box-sizing: border-box;
  padding: 50px;
  border-radius: 10px;
  ${({ showBorder }) =>
    showBorder &&
    css`
      border: 2px solid #119dfa;
    `}

  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const Container = styled.div`
  width: 800px;
`;

export const ImagePreviewContainer = styled.img`
  width: 150px;
`;

export type ImagePreviewProps = {
  url?: string;
};
export const ImagePreviewStyle = styled.div<ImagePreviewProps>`
  border-radius: 10px;
  width: 175px;
  height: 125px;
  ${({ url }) => css`
    background: url(${url});
  `}
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  animation: ${fadeIn} 500ms;
`;

export type PageProps = Partial<{
  flex: boolean;
  alignItems: string;
  justifyContent: string;
  flexGrow: string;
  flexDirection: string;
}>;

export const Page = styled.div<PageProps>`
  height: 100%;
  width: 100%;
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
    `}
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-direction: ${({ flexDirection }) => flexDirection};
`;

export const Label = styled.label`
  font-size: 22px;
`;

export const Text = styled.p`
  color: #8a8a8a;
`;
export const FileInput = styled.input`
  ${({ type }) =>
    type === 'file' &&
    css`
      display: none;
    `}
`;

export const Button = styled.button`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 50px;
  font-family: 'DM Sans';
  background-color: #0062ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 250ms background-color ease-in-out;
  :hover {
    background-color: #0e66f3;
  }
  :active {
    background-color: #2478ff;
  }
  :disabled {
    background-color: #2478ff2b;
    color: #ffffff2f;
  }
`;

export const Overlay = styled.div`
  height: 100%;
  width: 100%;
  background-color: #000000b1;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 200ms;
  z-index: 999;
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: #fff;
  :hover {
    color: #ff3434;
  }
`;

export type FlexProps = Partial<{
  alignItems: string;
  justifyContent: string;
  flexGrow: string;
  flexDirection: string;
}>;

export const Flex = styled.div<FlexProps>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-direction: ${({ flexDirection }) => flexDirection};
`;
