import React from 'react';
import styled from 'styled-components';

// html2canvas
import html2canvas from 'html2canvas';

import { connect } from 'react-redux';
import {
  removeOneThumbnail,
  removeAllThumbnails,
} from '../redux/stored-thumbnail/actions';

import * as B from '../styles/Button.styled';

function ThumbStorage(props) {
  /** 임시저장된 썸네일을 다운로드 하는 함수 */
  function downloadThumbnail(targetId) {
    const target = document.getElementById(`capture${targetId}`);
    if (!target) return;
    html2canvas(target, {
      letterRendering: 1,
      allowTaint: true, // cross-origin 이미지를 캔버스에 삽입할지
      useCORS: true, // Whether to attempt to load images from a server using CORS
    }).then((canvas) => {
      const link = document.createElement('a');
      document.body.appendChild(link);
      link.href = canvas.toDataURL('image/png');
      link.download = 'thumbnail.png';
      link.click();
      document.body.removeChild(link);
    });
  }

  /** 임시저장된 썸네일을 클립보드로 복사하는 함수 */
  function clipboardThumbnail(targetId) {
    const target = document.getElementById(`capture${targetId}`);
    if (!target) return;
    html2canvas(target, {
      letterRendering: 1,
      allowTaint: true, // cross-origin 이미지를 캔버스에 삽입할지
      useCORS: true, // Whether to attempt to load images from a server using CORS
    }).then((canvas) => {
      canvas.toBlob((blob) =>
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      );
    });
  }

  /** storedThumbnails를 화면에 구현할 html 코드로 return해줌 */
  const thumbnailsPreivew = props.storedThumbnails.map((obj, index) => {
    const scale = 360 / obj.width;
    const scaledWidth = obj.width * scale;
    const scaledHeight = obj.height * scale;
    const scaledTitleSize = obj.titleSize * scale;
    const scaledSubtitleSize = obj.subtitleSize * scale;
    return (
      <div key={index}>
        <ScaledCanvas
          id={`capture${obj.id}`}
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
          <B.Button onClick={() => props.removeOneThumbnail(obj.id)}>
            삭제
          </B.Button>
          <B.Button onClick={() => downloadThumbnail(obj.id)}>
            다운로드
          </B.Button>
          <B.Button onClick={() => clipboardThumbnail(obj.id)}>
            클립보드
          </B.Button>
        </div>
        <hr></hr>
      </div>
    );
  });

  return (
    <div className="thumb-storage">
      <header>미리보기 🎨</header>
      <B.SaveButton onClick={props.removeAllThumbnails}>전체삭제</B.SaveButton>
      <div className="thumbs-preview">{thumbnailsPreivew}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    storedThumbnails: state.storedThumbnails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeOneThumbnail: (targetId) => dispatch(removeOneThumbnail(targetId)),
    removeAllThumbnails: () => dispatch(removeAllThumbnails()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThumbStorage);

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
