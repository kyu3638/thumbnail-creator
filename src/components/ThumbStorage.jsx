import React, { useEffect, useState } from 'react';
import storage from '../utils/storage/storage';
import styled from 'styled-components';

function ThumbStorage() {
  /** localStorage로부터 받아온 썸네일들로 storedThumbnails를 초기화 */
  const [storedThumbnails, setStoredThumbnails] = useState(
    storage.get('thumbnail') || []
  );

  /** storedThumbnails를 화면에 구현할 html 코드로 return해줌 */
  const thumbnailsPreivew = storedThumbnails.map((obj, index) => {
    const scale = 360 / obj.width;
    const scaledWidth = obj.width * scale;
    const scaledHeight = obj.height * scale;
    const scaledTitleSize = obj.titleSize * scale;
    const scaledSubtitleSize = obj.subtitleSize * scale;
    return (
      <div key={index}>
        <ScaledCanvas
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
        <div className="preview-button">
          <button>수정</button>
          <button onClick={() => deleteThumbnail(obj.id)}>삭제</button>
        </div>
      </div>
    );
  });

  /** 임시저장된 썸네일을 삭제하는 함수, 해담 썸네일의 id를 인자로 받아 storedThumbnails에서 filter를 통해 삭제해준다 */
  function deleteThumbnail(targetId) {
    const arr = storedThumbnails.filter((thumb) => {
      if (thumb.id === targetId) console.log(`삭제될 id : ${thumb.id}`);
      return thumb.id !== targetId;
    });
    setStoredThumbnails((prev) => arr);
  }

  // storedThumbnails가 변경될 때마다 local storage를 업데이트 해준다.
  useEffect(() => {
    storage.set('thumbnail', storedThumbnails);
  }, [storedThumbnails]);

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
