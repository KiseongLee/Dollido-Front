import axios from "axios";
import React, { useState, useEffect } from "react";
import { ServerName } from "../../../serverName";
import Typewriter from "typewriter-effect";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setBestDone } from "../../../modules/inGame";
import { setTier, setWinRate, setRanking, setWin, setLose, setCheckGet } from "../../../modules/member"
import firework from "../../../images/fireworks/firework_7.gif";
import { s3Domain } from "../../../s3Domain";
import {yeahSF} from "../Sound";


let response;

const Container = styled.div`
    align-items: center;
    color: white;
    text-align: center;
    font-size: 78px;
`

// Blob(Binary Large Object) : JS에서 이미지, 사운드, 비디오 같은 멀티미디어 데이터를 다룰 때 사용
// webm : 웹에서 돌아가는 동영상 확장자
function BestPerformer(props) {
    const dispatch = useDispatch();
    const [gotVideo, setGotVideo] = useState(false);
    const [typedone, setTypeDone] = useState(false);
    const nick = useSelector((state) => state.member.member.user_nick);


    let content = '';
    // console.log("Show Best Performer");

    useEffect(() => {
        // Best Performer Nick과 비디오 얻어오기
        async function getLoserVideo() {
            const data = { roomID: props.roomID, user_nick: nick };
            response = await axios.post(`${ServerName}/api/best/get-best`, data)
                .then(res => res)
                .catch((err) => {
                    console.log(err);
                    return null;
                });
            // console.log("response : ", response);
            setGotVideo(true);
        }
        getLoserVideo();
    }, [])

    if (!gotVideo) {
        content = <h1> 로딩중... </h1>
    } else {
        if (response === null) {
            content = <h1> 오류가 발생했습니다 </h1>
        } else {
            // console.log(response.data)
            const result = response.data;
            const bestPerformerNick = result.bestPerformerNick;
            const bestVideoName = result.bestVideoName;
            const tier = result.tier;
            const ranking = result.ranking;
            const winRate = result.winRate;
            const win = result.win;
            const lose = result.lose;

            dispatch(setTier(tier));
            dispatch(setRanking(ranking));
            dispatch(setWinRate(winRate));
            dispatch(setWin(win));
            dispatch(setLose(lose));
            dispatch(setCheckGet(true));

            // console.log("Best Performer Nick :", bestPerformerNick);
            // console.log("Best Video Name :", bestVideoName);

            if (bestVideoName === undefined) {
                content =
                    <>
                        <h1> {bestPerformerNick}! </h1>
                        <h1> 비디오가 기록되지 않았습니다 😢 </h1>
                    </>
            } else {
                const videoUrl = s3Domain + bestVideoName;
                if (typedone) yeahSF.play();
                content = <>
                    <div> {bestPerformerNick}! </div>
                    <video src={videoUrl} autoPlay loop
                        style={{ margin: '40 0 0 0', borderRadius: '10px', width: "90%", transform: 'scaleX(-1)' }} />
                    <img src={firework} style={{ position: "absolute", width: "auto", height: "auto", top: "0%", left: "15%" }}></img>
                    <img src={firework} style={{ position: "absolute", width: "auto", height: "auto", top: "0%", right: "15%", transform: "scaleX(-1)" }}></img>
                </>
            }
        }
    }

    return <>
        <Container>
            {!typedone ?
                <Typewriter
                    options={{ cursor: '|', delay: '120', deleteSpeed: '5' }}
                    onInit={(typewriter) => {
                        typewriter.typeString("Game Over")
                            .pauseFor(1000)
                            .deleteAll()
                            .changeDelay(60)
                            .typeString("Best Performer is...")
                            .pauseFor(1500)
                            .callFunction(() => {
                                setTypeDone(true)
                                setTimeout(() => {
                                    dispatch(setBestDone(true));
                                }, 3000)
                            })
                            .start();
                    }} /> :
                content}
        </Container>
    </>
}

export default BestPerformer;