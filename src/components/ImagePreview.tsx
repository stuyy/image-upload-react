import React, { useEffect, useRef, useState } from 'react';
import { CloseIcon, ImagePreviewStyle, Overlay } from '../styles';
import { IoCloseOutline, IoCloseCircleSharp } from 'react-icons/io5';

export type ImagePreviewProps = {
  source: string;
  reset: () => void;
};
export const ImagePreview = ({ source, reset }: ImagePreviewProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    console.log(overlayRef.current);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVisible(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === overlayRef.current) {
      setVisible(false);
    }
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <ImagePreviewStyle
          url={source}
          style={{ margin: '10px 0' }}
          onClick={() => setVisible(true)}
        />
        <IoCloseCircleSharp
          size={40}
          style={{
            position: 'absolute',
            top: -15,
            right: -15,
            cursor: 'pointer',
            color: '#ff1919',
          }}
          onClick={(e) => reset()}
        />
      </div>
      {visible && (
        <Overlay ref={overlayRef} onClick={onOverlayClick}>
          <img src={source} alt="img_preview" width={1000} />
          <CloseIcon onClick={() => setVisible(false)}>
            <IoCloseOutline size={70} />
          </CloseIcon>
        </Overlay>
      )}
    </div>
  );
};
