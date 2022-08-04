import React, { useState } from "react";
import mainBackground from "../../../images/mainBackground.gif";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GlobalStyles } from "../../common/Global.tsx";
import { setMemberInit } from "../../../modules/member";


/* MUI */
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Profile from './Profile';
import Ranking from './Ranking';
import Images from './Images';
import VideoLibrary from "./VideoLibrary";

import useSound from 'use-sound';
import { select, exit } from '../Sound';

//profile
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import Moai from "../../../images/Moai3.png";
import Kaonish from "../../../images/Kaonish2.png";
import Monarisa from "../../../images/Monarisa2.png";
import KoreanMask from "../../../images/KoreanMask2.png";


const MyPage = () => {

  const dispatch = useDispatch();

  const [selectSound] = useSound(
    select,
    { volume: 0.5 }
  );
  const [exitSound] = useSound(
    exit,
  );

  const logout = () => {
    dispatch(setMemberInit());
  };

  const nickname = useSelector((state) => state.member.member.user_nick);
  const tier = useSelector((state) => state.member.tier)
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let image;
  let color;

  if (tier === "모나리자") 
    {image = Monarisa
      color = "#c0c0c0"}
  else if (tier === "모아이") {
    image = Moai
    color = "#00ffff"
  }
  else if (tier === "가오나시") {
    image = Kaonish
    color = "#ffe140"
  }
  else {

    image = KoreanMask
    color = "#c36729"
  }
  return (
    <div style={{ height: "100vh" }}>
        <GlobalStyles bgImage={mainBackground}></GlobalStyles>
        <FlexContainer>
          <header style={{ height: 80, display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "50px 100px 0 0" }}>
            {nickname && (
                      <>
                      <Link to = {`/mypage`} style = {{textDecoration:"none"}}>
                          <div style ={{ display:"flex", flexDirection:"row"}} >
                            <span style={{ color: "white", fontSize: "1.3rem", backgroundColor: '#ffd700', height:"48px"}}>
                            &nbsp;&nbsp;
                            </span>
                            
                              <img src={image} style={{backgroundColor: color, height:"48px" }} alt="tier"/>
                            
                            <span style={{ color: color, fontSize: "1.5rem", backgroundColor: '#182330E5', padding:"10px", height:"48px"}}>
                            {nickname}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            </span>
                          </div>
                        </Link>
                        <button className="logout" onClick={logout} border="0" outline="0">
                        <FontAwesomeIcon className="logouticon" icon={faPowerOff} size="2x" color="white" style={{padding:"0 0 0 20px"}}/>
                        </button>
                      </>

            )}
          </header>
          <Title>
            <GradationTitle>마이페이지</GradationTitle>
          </Title>
          <Content>
            <MyBox sx={{ width: '63%', typography: 'body1', color: 'white' }}>
              <MyTabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    centered
                    TabIndicatorProps={{ style: { backgroundColor: "#57C2F0" } }}
                    sx={{
                      "& button.Mui-selected": { color: "#57C2F0" },
                    }}
                    onChange={handleChange}>
                    <MyTab sx={{ "&:hover": { transform: "scale(1.3)" } }} label="프로필" value="1"
                      onMouseEnter={() => {
                        selectSound();
                      }}
                    />
                    <MyTab sx={{ "&:hover": { transform: "scale(1.3)" } }} label="나만의 무기" value="2"
                      onMouseEnter={() => {
                        selectSound();
                      }}
                    />
                    <MyTab sx={{ "&:hover": { transform: "scale(1.3)" } }} label="랭킹" value="3"
                      onMouseEnter={() => {
                        selectSound();
                      }}
                    />
                    <MyTab sx={{ "&:hover": { transform: "scale(1.3)" } }} label="라이브러리" value="4"
                      onMouseEnter={() => {
                        selectSound();
                      }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                      <Profile></Profile>
                </TabPanel>
                <TabPanel value="2">
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Images></Images>
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <Ranking></Ranking>
                </TabPanel>
                <TabPanel value="4">
                  <VideoLibrary></VideoLibrary>
                </TabPanel>
              </MyTabContext>
            </MyBox>
          </Content>
          <BackToLobby to={'/lobby'} onMouseDown={exitSound}>
            &lt; 뒤로가기
          </BackToLobby>
        </FlexContainer>
      </div>
      );
};

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: koverwatch;
`

const Title = styled.div`
  display: flex;
  align-items: center;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
`

const MyTab = styled(Tab)`
  color: white;
  font-family: koverwatch;
  font-size: 40px;
  margin: 20px;
`

const MyBox = styled(Box)`

`

const MyTabContext = styled(TabContext)`
  display: flex;
  justify-content: center;
`

const GradationTitle = styled.h1`
  padding: 0 15px 0 100px;
  color: white;
  font-size: 6rem;
  font-style: italic;
  user-select: none;
  background: linear-gradient(to right top, #FFFFFF, #FFFFFF);
  ${'' /* -webkit-text-stroke: 3px black; */}
  color: transparent;
  -webkit-background-clip: text;
`

const BackToLobby = styled(Link)`
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: auto;
  height: auto;
  color: white;
  font-size: 2rem;
  padding: 3px;
  margin: 0 100px 0 0;
  text-decoration: none;
  &:hover {
    transform: scale(1.2);
  color: white;
  }
`


      export default MyPage