import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import {
  removeOneThumbnail,
  removeAllThumbnails,
} from '../redux/stored-thumbnail/actions';

import * as B from '../styles/Button.styled';

function ThumbStorage(props) {
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
          <B.Button>다운로드</B.Button>
        </div>
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
