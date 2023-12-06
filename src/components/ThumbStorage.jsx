import React from 'react';
import storage from '../utils/storage/storage';
import styled from 'styled-components';

function ThumbStorage() {
  const storedThumbnails = storage.get('thumbnail');

  const thumbnailsPreivew = storedThumbnails.map((obj, id) => {
    const scale = 360 / obj.width;
    const scaledWidth = obj.width * scale;
    const scaledHeight = obj.height * scale;
    const scaledTitleSize = obj.titleSize * scale;
    const scaledSubtitleSize = obj.subtitleSize * scale;
    return (
      <ScaledCanvas
        key={id}
        $width={scaledWidth}
        $height={scaledHeight}
        $background={obj.background}
      >
        <ScaledThumbTitle
          $titleSize={scaledTitleSize}
          $isBold={obj.isBold}
          $isShadow={obj.isShadow}
          $isBlack={obj.isBlack}
        >
          {obj.title}
        </ScaledThumbTitle>
        <hr className="line"></hr>
        <ScaledThumbSubtitle
          $subtitleSize={scaledSubtitleSize}
          $isBold={obj.isBold}
          $isShadow={obj.isShadow}
          $isBlack={obj.isBlack}
        >
          {obj.subtitle}
        </ScaledThumbSubtitle>
      </ScaledCanvas>
    );
  });

  return (
    <div className="thumb-storage">
      <header>미리보기</header>
      <div className="thumbs-preview">{thumbnailsPreivew}</div>
    </div>
  );
}

export default ThumbStorage;

const ScaledCanvas = styled.div`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.$background};
  background-position: center;
  background-size: cover;
`;

const ScaledThumbTitle = styled.h2`
  font-size: ${(props) => props.$titleSize}px;
  font-weight: ${(props) => (props.$isBold ? 'bold' : 'normal')};
  text-shadow: ${(props) =>
    props.$isShadow ? '2px 2px 3px rgba(0,0,0,0.5)' : 'unset'};
  color: ${(props) => (props.$isBlack ? 'black' : 'white')};
`;

const ScaledThumbSubtitle = styled.h3`
  font-size: ${(props) => props.$subtitleSize}px;
  font-weight: ${(props) => (props.$isBold ? 'bold' : 'normal')};
  text-shadow: ${(props) =>
    props.$isShadow ? '2px 2px 3px rgba(0,0,0,0.5)' : 'unset'};
  color: ${(props) => (props.$isBlack ? 'black' : 'white')};
`;
