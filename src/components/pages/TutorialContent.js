import React, { Component } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import '../pages/Tutorial/slick.css';
import '../pages/Tutorial/slick-theme.css';
// import Slider from "./slider"
import Slider from "../pages/Tutorial/react-slick/slider"

import { ThemeProvider } from "styled-components";
import { Background } from "../common/Background.tsx";
// import "../common/RoomMode.css"
import TutorialBackGround from "../../images/tutorial_background2.gif";
import mainBackGround from "../../images/mainBackground.gif";

import ModeOne from "../../images/ModeOne.gif";
import ModeTwo from "../../images/ModeTwo.gif";
import ModeThree from "../../images/ModeThree.gif";
import styled from "styled-components";

//티어
import Moai from "../../images/Moai2.png";
import Kaonish from "../../images/Kaonish.png";
import Monarisa from "../../images/Monarisa.png";
import KoreanMask from "../../images/KoreanMask.png";
import logo from "../../images/logo3.gif";


const FlexContainer = {
    display: "flex",
    height: "100%",
    fontFamily: "koverwatch",
    alignItems: "center"
  };
  const Header = {
    flex: "1",
    color: "white",
    textAlign: "left",
  };

  const Middle = {
    flex: "7",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  };

  const MiddleTwo = {
    flex: "7",
    display: "flex",
  };

  const MiddleThree = {
    flex: "7",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  };

  const Bottom = {
    flex: "2",
    // textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  };

  const Content = styled.div`
    &:hover {
      transform: scale(1.2);
      box-shadow: 0 25px 50px 0 #f4dbf4;
    }
  `;

  const Modeimage = styled.img`
    &:hover {
    }
  `;
  const GradationTitle = styled.h1`
    margin: 10px 0 10px 0;
    color: white;
    font-size: 4rem;
    font-style: italic;
    user-select: none;
    background: linear-gradient(to right top, #ffffff, #ffffff);
    //   -webkit-text-stroke: 3px black;
    color: transparent;
    -webkit-background-clip: text;
  `;

  const modename = {
    // color: "black",
    // backgroundColor: "white",
    // fontStyle: "italic",
    // margin: "0 0 0 0"
    textAlign: "center",
  };


  const modecontentone ={
    color : "black",
    backgroundColor: "white",
    display: "flex",
    alignItems:"flex-end",
    justifyContent: "center",
    margin: "0 0 0 0",
    padding: "20px 0 0 0",

  }

  const modecontenttwo ={
    color : "black",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems:"flex-end",
    justifyContent: "center",
    margin: "0 0 0 0",
    padding: "0 0 20px 0",

  }

  const modecontentthree ={
    color : "white",
    backgroundColor: "transparent",
    textAlign:"left",
    margin: "0 0 0 0",
    padding: "20px 0 0 0",

  }
  const modecontentfive ={
    color : "white",
    backgroundColor: "transparent",
    textAlign:"center",
    margin: "0 0 0 0",
    padding: "0 0 0 0",

  }



export default class SimpleSlider extends Component {


    render() {

        const settings = {
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
      return (
        <ThemeProvider
        theme={{
          palette: {
            yellow: "#E5B941",
            orange: "#F0A82BEE"
          },
        }}
        style={{height:"100%"}}
      >
          <Background
      background={mainBackGround}
      style={{height:"100%"}}
      element={
        <div style={{height:"100%"}}>
          <Slider {...settings} style={FlexContainer}>

            <div style={{height:"100%"}}>
              <div style={Header}></div>
              <div style={MiddleTwo}>
                <div style={{flex:5, display: "flex", flexDirection:"column", alignItems:"flex-end"}}>
                <img src={logo} style={{ textAlign: "center", maxWidth: "600px" }} ></img>
                </div>
                <div style={{flex:5, display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <GradationTitle style={{textAlign:"center", fontStyle:"normal", fontSize:"6rem", lineHeight: "1.5"}}>게임 설명</GradationTitle>
                  <div style={{textAlign:"left"}}>
                  <p></p> <p></p><p></p><p></p>
                  <h1 style={modecontentthree}> 🫰 1분 30초 동안 웃짤로부터 웃음을 최대한 참습니다. </h1>
                  <p></p> <p></p>
                  <h1 style={modecontentthree}> 🫰 웃으면 나의 HP가 깎이게 됩니다. </h1>
                  <p></p> <p></p>
                  <h1 style={modecontentthree}> 🫰 게임 시작 전에 나만의 무기를 장착해 보세요!  </h1>
                  <p></p> <p></p>
                  <h1 style={modecontentthree}> 🫰 인식이 안되면 HP가 감소합니다. </h1>
                  <p></p> <p></p>
                  <h1 style={modecontentthree}> 🫰 리버스 모드에서는 웃지 않을 때 HP가 깎입니다. </h1>

                  </div>
                </div>
                </div>
              <div style={Bottom}></div>
            </div>


            <div style={{height:"100%"}} >
                <div style={Header}></div>
                <div style={Middle}>
              <Content

                // onMouseEnter = {selectSound}
              >
                <GradationTitle style={modename}>리버스 모드</GradationTitle>
                <Modeimage src={ModeOne} />
                <h2 style={modecontentone}>돌발적으로 등장하는 리버스 타임!</h2>
                <h2 style={modecontenttwo}>웃지 않으면 오히려 체력이 깎인다고!?</h2>
              </Content>
              <Content

                // onMouseEnter = {selectSound}
              >
                <GradationTitle style={modename}>나만의 무기</GradationTitle>
                <Modeimage src={ModeThree} />
                <h2 style={modecontentone}>플레이어가 직접 고른 야심찬 웃짤!</h2>
                <h2 style={modecontenttwo}>이걸 보고도 버틸 수 있겠어?</h2>
              </Content>
              <Content

                // onMouseEnter = {selectSound}
              >
                <GradationTitle style={modename}>제우스의 심판</GradationTitle>
                <Modeimage src={ModeTwo} />
                <h2 style={modecontentone}>악의적 행위는 금물!</h2>
                <h2 style={modecontenttwo}>언제 내 머리위로 떨어질 지 모르는 번개!!</h2>

              </Content>
            </div>
            <div style={Bottom}>
            </div>
          </div>
            <div style={{height:"100%"}}>
            <div style={Header}>
            <GradationTitle style={{textAlign:"left", fontSize:"8rem", lineHeight: "1.5", margin: "30px 0 0 100px"}}>티어</GradationTitle>
            </div>
            <div style={MiddleThree}>
            <Content>
            <GradationTitle style={{textAlign: "center", color: "#00ffff"}}>모아이</GradationTitle>
                <Modeimage src={Moai} style={{backgroundColor: "#00ffff", width: "300px", height:"300px"}} />
                <h1 style={modecontentfive}>상위 10%</h1>
            </Content>
            <Content>
            <GradationTitle style={{textAlign: "center", color: "#ffe140"}}>가오나시</GradationTitle>
                <Modeimage src={Kaonish} style={{backgroundColor: "#ffe140", width: "300px", height:"300px"}} />
                <h1 style={modecontentfive}>상위 10% - 30%</h1>
            </Content>
            <Content>
            <GradationTitle style={{textAlign: "center", color: "#c0c0c0"}}>모나리자</GradationTitle>
                <Modeimage src={Monarisa} style={{backgroundColor: "#c0c0c0", width: "300px", height:"300px"}} />
                <h1 style={modecontentfive}>상위 30% - 60%</h1>
            </Content>
            <Content>
            <GradationTitle style={{textAlign: "center", color: "#c36729"}}>하회탈</GradationTitle>
                <Modeimage src={KoreanMask} style={{backgroundColor: "#c36729", width: "300px", height:"300px"}} />
                <h1 style={modecontentfive}>상위 60% - 100%</h1>
            </Content>
            </div>
            <div style={Bottom}></div>
            </div>
          </Slider>
        </div>
          }
          />
        </ThemeProvider>
      );
    }
  }
