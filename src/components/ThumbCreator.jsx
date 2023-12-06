import React, { useState } from 'react';
import styled from 'styled-components';

/** localStorage 이용을 위한 유틸리티 함수 */
import storage from '../utils/storage/storage';
import html2canvas from 'html2canvas';

function ThumbCreator() {
  // thumbnail state
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [background, setBackground] = useState(
    `url(https://images.unsplash.com/photo-1685895324391-ba9e104fd2d0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`
  );
  // text
  const [title, setTitle] = useState('제목을 입력하세요');
  const [subtitle, setSubtitle] = useState('소제목을 입력하세요');
  const [titleSize, setTitleSize] = useState(30);
  const [subtitleSize, setSubtitleSize] = useState(20);
  const [isBold, setIsBold] = useState(false);
  const [isShadow, setIsShadow] = useState(false);
  const [isBlack, setIsBlack] = useState(false);

  /** 사용자가 선택한 옵션에 따라 배경을 그리는 함수 */
  function setBackgroundImage(event) {
    /** 랜덤한 rgb 색상 생성하는 함수  */
    function makeRGB() {
      const a = Math.floor(Math.random() * 90 + 1) + 150;
      const b = Math.floor(Math.random() * 90 + 1) + 150;
      const c = Math.floor(Math.random() * 90 + 1) + 150;
      const rgb = `rgb(${a},${b},${c})`;
      return rgb;
    }
    /** 2개의 RGB값으로 그라디언트를 만드는 함수 */
    function makeGradient() {
      const color1 = makeRGB();
      const color2 = makeRGB();
      return `linear-gradient(${color1}, ${color2})`;
    }
    switch (event.target.innerText) {
      case '단색':
        setBackground(makeRGB());
        break;
      case '그라디언트':
        setBackground(makeGradient());
        break;
      case '이미지링크':
        const imageLink = prompt('이미지 링크를 입력해주세요');
        setBackground(`url(${imageLink})`);
        break;
    }
  }

  /** 텍스트 굵기 변경하는 함수  */
  function textBoldHandler() {
    if (isBold) setIsBold(false);
    else setIsBold(true);
  }
  /** 텍스트 그림자 변경하는 함수 */
  function textShadowHandler() {
    if (isShadow) setIsShadow(false);
    else setIsShadow(true);
  }
  /** 텍스트 색상 반전하는 함수 */
  function textColorHandler() {
    if (isBlack) setIsBlack(false);
    else setIsBlack(true);
  }

  /** 현재 제작 중인 썸네일을 local storage에 임시저장하는 함수 */
  function saveTemp() {
    const storedThumbnails = storage.get('thumbnail') || [];
    // 기존에 임시 저장된 썸네일이 있으면 마지막 번호 + 1, 아니면 0을 id로 설정
    const newId = storedThumbnails.length ? storedThumbnails[0].id + 1 : 0;
    let thumbnailInfo = {
      id: newId,
      width: width,
      height: height,
      background: background,
      title: title,
      subtitle: subtitle,
      titleSize: titleSize,
      subtitleSize: subtitleSize,
      isBold: isBold,
      isShadow: isShadow,
      isBlack: isBlack,
    };
    // 가장 최근에 저장한 파일이 위로 오도록 thumbnailInfo를 앞에 삽입한다.
    storage.set('thumbnail', [thumbnailInfo, ...storedThumbnails]);
  }

  function downloadThumbnail() {
    const target = document.getElementById('thumbnail');
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

  return (
    <div className="thumb-creator">
      <div className="preview">
        <Canvas
          id="thumbnail"
          className="thumb"
          $width={width}
          $height={height}
          $background={background}
        >
          <ThumbTitle
            $titleSize={titleSize}
            $isBold={isBold}
            $isShadow={isShadow}
            $isBlack={isBlack}
          >
            {title}
          </ThumbTitle>
          <hr className="line"></hr>
          <ThumbSubtitle
            $subtitleSize={subtitleSize}
            $isBold={isBold}
            $isShadow={isShadow}
            $isBlack={isBlack}
          >
            {subtitle}
          </ThumbSubtitle>
        </Canvas>
      </div>
      <div className="options">
        <Option $num={2}>
          <h2>사이즈</h2>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </Option>
        <Option $num={3}>
          <h2>배경</h2>
          <button onClick={setBackgroundImage}>단색</button>
          <button onClick={setBackgroundImage}>그라디언트</button>
          <button onClick={setBackgroundImage}>이미지링크</button>
        </Option>
        <Option $num={2}>
          <h2>텍스트</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </Option>
        <Option $num={4}>
          <h2>텍스트 크기</h2>
          <button onClick={() => setTitleSize((pre) => pre + 1)}>
            제목 크게
          </button>
          <button onClick={() => setTitleSize((pre) => pre - 1)}>
            제목 작게
          </button>
          <button onClick={() => setSubtitleSize((pre) => pre + 1)}>
            소제목 크게
          </button>
          <button onClick={() => setSubtitleSize((pre) => pre - 1)}>
            소제목 작게
          </button>
        </Option>
        <Option $num={3}>
          <h2>텍스트 스타일</h2>
          <button onClick={textBoldHandler}>텍스트 굵게</button>
          <button onClick={textShadowHandler}>텍스트 그림자</button>
          <button onClick={textColorHandler}>텍스트 반전</button>
        </Option>
      </div>
      <SaveOptions>
        <button onClick={saveTemp}>임시저장</button>
        <button onClick={downloadThumbnail}>다운로드</button>
        <button>클립보드 복사</button>
      </SaveOptions>
    </div>
  );
}

export default ThumbCreator;

const Canvas = styled.div`
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

const Option = styled.div`
  width: 90%;
  heigth: 15%;
  display: grid;
  grid-template-rows: 1;
  grid-template-columns: 25% repeat(${(props) => +props.$num}, 1fr);
`;

const ThumbTitle = styled.h2`
  font-size: ${(props) => props.$titleSize}px;
  font-weight: ${(props) => (props.$isBold ? 'bold' : 'normal')};
  text-shadow: ${(props) =>
    props.$isShadow ? '2px 2px 3px rgba(0,0,0,0.5)' : 'unset'};
  color: ${(props) => (props.$isBlack ? 'black' : 'white')};
`;

const ThumbSubtitle = styled.h3`
  font-size: ${(props) => props.$subtitleSize}px;
  font-weight: ${(props) => (props.$isBold ? 'bold' : 'normal')};
  text-shadow: ${(props) =>
    props.$isShadow ? '2px 2px 3px rgba(0,0,0,0.5)' : 'unset'};
  color: ${(props) => (props.$isBlack ? 'black' : 'white')};
`;

const SaveOptions = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
`;
