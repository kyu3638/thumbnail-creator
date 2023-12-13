import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// html2canvas
import html2canvas from 'html2canvas';
// redux
import { connect } from 'react-redux';
import { addThumbnail } from '../redux/stored-thumbnail/actions';
import { changeBackground } from '../redux/app-background/actions';
// Button Component
import * as B from '../styles/Button.styled';

function ThumbCreator(props) {
  // thumbnail state
  const [width, setWidth] = useState(1280);
  const [height, setHeight] = useState(720);
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

  function changeCanvas(event) {
    const size = Number(event.target.getAttribute('size-info'));
    switch (size) {
      case 1:
        setWidth(600);
        setHeight(600);
        break;
      case 2:
        setWidth(1280);
        setHeight(720);
        break;
      case 3:
        setWidth(720);
        setHeight(540);
        break;
      default:
        setWidth(1280);
        setHeight(720);
    }
  }

  useEffect(() => {
    const preview = document.getElementById('preview');
    const x = preview.clientWidth;
    const y = preview.clientHeight;
    let flag = false;
    let tempWidth = width;
    let tempHeight = height;
    while (!flag) {
      if (tempWidth >= x || tempHeight >= y) {
        tempWidth *= 0.8;
        tempHeight *= 0.8;
      } else {
        flag = true;
      }
    }
    setWidth(tempWidth);
    setHeight(tempHeight);
  }, [width, height]);

  /** 사용자가 선택한 옵션에 따라 배경을 그리는 함수 */
  function setBackgroundImage(event) {
    /** 랜덤한 rgb 색상 생성하는 함수  */
    function makeRGB() {
      const a = Math.floor(Math.random() * (255 - 150 + 1)) + 150;
      const b = Math.floor(Math.random() * (255 - 150 + 1)) + 150;
      const c = Math.floor(Math.random() * (255 - 150 + 1)) + 150;
      const rgb = `rgb(${a},${b},${c})`;
      return rgb;
    }
    /** 2개의 RGB값으로 그라디언트를 만드는 함수 */
    function makeGradient() {
      const color1 = makeRGB();
      const color2 = makeRGB();
      return `linear-gradient(${color1}, ${color2})`;
    }
    let background;
    switch (event.target.innerText) {
      case '단색':
        background = makeRGB();
        setBackground(background);
        props.changeBackground(background);
        break;
      case '그라디언트':
        background = makeGradient();
        setBackground(background);
        props.changeBackground(background);
        break;
      case '이미지링크':
        const imageLink = prompt('이미지 링크를 입력해주세요');
        setBackground(`url(${imageLink})`);
        props.changeBackground(`url(${imageLink})`);
        break;
      default:
        background = makeRGB();
        setBackground(background);
        props.changeBackground(background);
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

  /** 현재 제작 중인 썸네일을 local storage에 임시저장하는 함수, redux에서 전역 상태관리하는 storedThumbnails에 새로운 썸네일 정보를 추가 후 local storage도 업데이트 한다. */
  function addThumbHandler() {
    const newId = props.storedThumbnails.length
      ? props.storedThumbnails[0].id + 1
      : 0;
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
    props.addThumbnail(thumbnailInfo);
  }

  /** 현재 생성하고 있는 썸네일을 다운로드 하는 함수 */
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

  /** 현재 생성하고 있는 썸네일을 클립보드로 복사하는 함수 */
  function clipboardThumbnail() {
    const target = document.getElementById('thumbnail');
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

  return (
    <div className="thumb-creator">
      <div id="preview" className="preview">
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
        <Option $num={3}>
          <OptionName>사이즈</OptionName>
          <B.Button size-info={1} onClick={changeCanvas}>
            1:1
          </B.Button>
          <B.Button size-info={2} onClick={changeCanvas}>
            16:9
          </B.Button>
          <B.Button size-info={3} onClick={changeCanvas}>
            4:3
          </B.Button>
        </Option>
        <Option $num={3}>
          <OptionName>배경</OptionName>
          <B.Button onClick={setBackgroundImage}>단색</B.Button>
          <B.Button onClick={setBackgroundImage}>그라디언트</B.Button>
          <B.Button onClick={setBackgroundImage}>이미지링크</B.Button>
        </Option>
        <Option $num={2}>
          <OptionName>텍스트</OptionName>
          <TitleInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TitleInput
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </Option>
        <Option $num={4}>
          <OptionName>텍스트 크기</OptionName>
          <B.Button onClick={() => setTitleSize((pre) => pre + 2)}>
            제목 크게
          </B.Button>
          <B.Button onClick={() => setTitleSize((pre) => pre - 2)}>
            제목 작게
          </B.Button>
          <B.Button onClick={() => setSubtitleSize((pre) => pre + 2)}>
            소제목 크게
          </B.Button>
          <B.Button onClick={() => setSubtitleSize((pre) => pre - 2)}>
            소제목 작게
          </B.Button>
        </Option>
        <Option $num={3}>
          <OptionName>텍스트 스타일</OptionName>
          <B.CheckButton onClick={textBoldHandler} $checked={isBold}>
            텍스트 굵게
          </B.CheckButton>
          <B.CheckButton onClick={textShadowHandler} $checked={isShadow}>
            텍스트 그림자
          </B.CheckButton>
          <B.CheckButton onClick={textColorHandler} $checked={isBlack}>
            텍스트반전
          </B.CheckButton>
        </Option>
      </div>
      <SaveOptions>
        <B.SaveButton onClick={(e) => addThumbHandler(e)}>
          임시저장
        </B.SaveButton>
        <B.SaveButton onClick={downloadThumbnail}>다운로드</B.SaveButton>
        <B.SaveButton onClick={clipboardThumbnail}>클립보드 복사</B.SaveButton>
      </SaveOptions>
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
    addThumbnail: (newThumbInfo) => dispatch(addThumbnail(newThumbInfo)),
    changeBackground: (background) => dispatch(changeBackground(background)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThumbCreator);

const Canvas = styled.div`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: ${(props) => props.$background};
  background-position: center;
  background-size: cover;
  scale: ${(props) => props.$scale};
`;

const Option = styled.div`
  width: 90%;
  heigth: 15%;
  display: grid;
  grid-template-rows: 1;
  grid-template-columns: 25% repeat(${(props) => +props.$num}, 1fr);
  Button {
    &:nth-child(2) {
      justify-self: start;
    }
    &:last-child {
      justify-self: end;
    }
  }
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
  padding: 0 30px;
`;

const OptionName = styled.h2`
  // justify-self: center;
  padding-left: 20px;
  align-self: center;
  font-weight: bold;
  font-size: 16px;
`;

const TitleInput = styled.input`
  width: 90%;
  height: 100%;
  border: none;
  border-radius: 10px;
  padding: 4px;
  padding-left: 10px;
  font-size: 16px;
  color: #666666;
`;
