import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useInterval } from "../../common/usefulFuntions";
import ProgressBar from 'react-bootstrap/ProgressBar';
import styled, {keyframes} from "styled-components";
import effect from "../../../images/pepe-laugh-laugh.gif";
import judgementEffect from "../../../images/judgement.png"
import Load from "./Loading";
import Notreadyimage from "../../../images/Notready.png";
import Chiefimage from "../../../images/Chief.png";
import Playingimage from "../../../images/Playing.png";
import readyvideo from "../../../images/ready.mp4";



import 'bootstrap/dist/css/bootstrap.min.css';

// ServerName import
import { ServerName } from "../../../serverName";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { setMineHP, setMyStream } from "../../../modules/inGame";

// face api import
import * as faceapi from 'face-api.js';
import { setMyWeapon, setMyWeaponCheck } from "../../../modules/item";

const recordTime = 3000; // 녹화 시간(ms)
const modelInterval = 500; // 웃음 인식 간격(ms)
const initialHP = 100;
const recordStandard = 3;   // best performer 녹화 기준(연속으로 웃은 횟수)
const faceDetectionOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: 224 });

const blinkEffect = keyframes`
    50% {
        opacity: 0;
    }
`
const JudgementImage = styled.img`
    position: absolute;
    width: auto;
    height: auto;
    top: -20%;
    left: 11%;
    animation: ${blinkEffect} 0.25s step-end infinite;
`

const Container = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
`
const NickName = styled.h2 `
    flex: 1;
    color: white;
`

const VideoContent = styled.div`
    flex: 9;
    width: 250px;
    display: relative;
`

const VideoStyle = styled.video `
    flex: 9;
    width: 250px;
    height: 190px;
    border-radius: 10%;
    justify-content: center;
    transform: scaleX(-1);
`

const LoadingDiv = styled.div`
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const HPContainer = styled.div `
    display: flex;
    width: 320px;
    color: white;
    justify-content: center;
    margin-top: 20px;
`

const HPContent = styled.div `
    width: 80%;
`

const ShowReady = styled.div`
    text-align: center;
    width: 100%;
    color: white;
    flex: 1;
    margin: 0;
`


// 녹화가 완료된 후 서버로 비디오 데이터 post
async function postVideo(recordedBlob, user_nick, token) {
    const formdata = new FormData();
    formdata.append('user_nick', user_nick);
    formdata.append('video', recordedBlob, `${user_nick}.mp4`);

    await axios.post(`${ServerName}/api/best/send-video`, formdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "ACCEPT": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Max-Age": "8000",
            token: token
        }
    })
        .then((res) => {
            console.log('POST res : ', res)
        })
        .catch((err) => {
            console.log('err : ', err)
        });
}


function recordVideo(stream, user_nick, token) {
    let recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
        const recordedBlob = new Blob([event.data], {
            type: "video/mp4"
        });
        postVideo(recordedBlob, user_nick, token);
    };
    console.log("Recording Start...");
    recorder.start();
    setTimeout(() => {
        recorder.stop();
    }, recordTime);
}

const MyNickname = {
    alignItems: 'flex-end',
    justifyContent: 'center',
    color: 'White',
}


const MyVideo = ({ match, socket }) => {
    const dispatch = useDispatch();
    // const inGameState = useSelector((state) => (state.inGame));
    const token = useSelector((state) => state.member.member.tokenInfo.token);
    const gameFinished = useSelector((state) => (state.inGame.gameFinished));
    const gameStarted = useSelector((state) => (state.inGame.gameStarted));
    const modelsLoaded = useSelector((state) => (state.inGame.modelsLoaded));
    const myStream = useSelector((state) => (state.inGame.myStream));
    const chiefStream = useSelector((state) => (state.inGame.chiefStream));
    const readyList = useSelector((state) => state.inGame.readyList[myStream ? myStream.id : null]);
    const mineHP = useSelector((state) => (state.inGame.myHP));

    const user_nick = useSelector((state) => state.member.member.user_nick);
    const { roomID } = useParams();
    const userVideo = useRef(null);
    const [loading, setLoading] = useState(true);

    let videoRecorded = false; // 녹화 여부


    useEffect(() => {
        if (modelsLoaded && myStream && myStream.id) {
            userVideo.current.srcObject = myStream;
            setLoading(false);
        }
        return () => {
            async function videoOff() {
                if (myStream && myStream.id) {
                    await myStream.getTracks().forEach((track) => {
                        track.stop();
                    });
                }
            }
            videoOff();
        }
    }, [modelsLoaded, myStream]);

    useEffect(() => {
        return () => {
            dispatch(setMyStream(null));
            dispatch(setMineHP(null));
            dispatch(setMyWeapon(false));
            dispatch(setMyWeaponCheck(false));
            userVideo.current = null;
        }
    }, [socket, match]);


    function handleHP(happiness, reverse, smileCount) {
        if (reverse) {
            happiness = 1 - happiness;
            if (!videoRecorded) {
                if (happiness < 0.4){
                    smileCount.current += 1
                    if (smileCount.current === recordStandard) {
                        videoRecorded = true;
                        recordVideo(userVideo.current.srcObject, user_nick, token);
                    }
                } else smileCount.current = 0;
            }
        }
        if (happiness > 0.2) { // 피를 깎아야 하는 경우
            if (happiness > 0.6) {
                if (!videoRecorded && !reverse) { // 딱 한 번만 record
                    smileCount.current += 1
                    if (smileCount.current === recordStandard) {
                        videoRecorded = true;
                        recordVideo(userVideo.current.srcObject, user_nick, token);
                    }
                }
                return 3;
            } else {
                return 1;
            }
        } else if (!videoRecorded && !reverse) smileCount.current = 0;
        return 0;
    }


    const ShowStatus = ({myStreamID}) => {
        const reverse = useSelector((state) => state.item.reverse);
        const partnerVideos = useSelector((state) => state.videos); 

        /* judgement*/
        const isAbusing = useSelector((state) => state.item.judgementList[myStreamID]);
        const zeusAppear = useRef(false);
        const abusingCount = useRef(0);

        const smileCount = useRef(0); // 연속으로 웃은 횟수 측정(for best performer record)
        const [myHP, setMyHP] = useState(initialHP);
        const [smiling, setSmiling] = useState(false);
        const [interval, setModelInterval] = useState(gameFinished ? null : modelInterval);
        let content = "";
        
        useEffect(() => {
            if (gameStarted && !gameFinished) {
                socket.emit("smile", myHP, roomID, user_nick, myStream.id, false);
            }
        }, [partnerVideos]);

        /** 모델 돌리기 + 체력 깎기 */
        useInterval(async () => {
            let newHP = 0;
            if (myStream && myStream.id) {
                const detections = await faceapi.detectAllFaces(userVideo.current, faceDetectionOptions).withFaceExpressions();

                /** Zeus */
                if(detections.length === 0 && gameStarted) {
                    abusingCount.current += 1;
                    if(abusingCount.current === 10) {
                        zeusAppear.current = true;
                        socket.emit("zeus_appear", roomID);
                    };
                    if(abusingCount.current === 25) {
                        socket.emit("judgement", roomID, myStream.id);
                        socket.emit("zeus_disappear", roomID)
                        zeusAppear.current = false;
                        abusingCount.current = 0;
                        newHP = myHP - 30;
                        setMyHP(newHP);
                        socket.emit("smile", newHP, roomID, user_nick, myStream.id, true);
                        if (newHP <= 0) { // game over
                            socket.emit("finish", { roomID: roomID });
                            setModelInterval(null);
                        }
                    };
                } else if (abusingCount.current !== 0) {
                    console.log("abuseCnt :", abusingCount.current);
                    abusingCount.current = 0;
                    if (zeusAppear.current) {
                        socket.emit("zeus_disappear", roomID);
                        zeusAppear.current = false;
                    }
                };

                /** Smile Check */
                if (detections[0] && gameStarted) {
                    const decrease = handleHP(detections[0].expressions.happy, reverse, smileCount);

                    if (decrease > 0) {
                        newHP = myHP - decrease;
                        socket.emit("smile", newHP, roomID, user_nick, myStream.id, false);
                        if (newHP <= 0) { // game over
                            socket.emit("finish", { roomID: roomID });
                            setModelInterval(null);
                        }
                        setMyHP(newHP);
                        setSmiling(true);
                    } else {
                        setSmiling(false);
                    }
                } else {
                    setSmiling(false);
                }
            }
        }, interval);


        if (interval && smiling) {
            content =<>
            <img src={effect} style={{position:"absolute", width:"auto", height:"auto", top:"10%", left:"8%" }}></img>
            <ProgressBar striped variant="danger" now={myHP} />
            </>;
        } else if(interval && !smiling && !isAbusing){
            content = <ProgressBar striped variant="danger" now={myHP} />
        } else if(interval && !smiling && isAbusing) {
            content = <>
                <JudgementImage src={judgementEffect} />
                <ProgressBar striped variant="danger" now={myHP} />
            </>;
        } else {
            // console.log(mineHP);
            content = <ProgressBar striped variant="danger" now={mineHP} />
        }

        useEffect(() => {
            socket.on("finish", (hpList) => {
              // HP [streamID, HP]
                if (myStream && myStream.id) {
                    hpList.map((HP) => {
                        if (myStream.id === HP[0]){
                            // console.log(myStream.id)
                            // console.log(HP[0],":",HP[1])
                            if (HP[1] < 0) {
                                dispatch(setMineHP(0))
                                content = <ProgressBar striped variant="danger" now={mineHP} />
                            }else {
                                dispatch(setMineHP(HP[1]))
                                // console.log(mineHP);
                                content = <ProgressBar striped variant="danger" now={mineHP} />
                            }
                        }
                    });
                }
            });
        }, [socket])
        return content;
    }


    const ShowMyReady = () => {
        const [bool, setBool] = useState(false);
        useEffect(() => {
            if(myStream && myStream.id) {
                setBool(readyList);
            }
        }, [readyList]);

        return (
            <ShowReady>
                {!gameStarted?
                    myStream && myStream.id === chiefStream ?
                        <img alt="Chief" src={Chiefimage} style={{margin:"8px 0 0 0",borderRadius: "10px"}} /> :
                        bool ? <video src={readyvideo} autoPlay style={{margin:"8px 0 0 0",borderRadius: "10px"}} ></video>
                        : <img alt="Notready" src={Notreadyimage} style={{margin:"8px 0 0 0",borderRadius: "10px"}}/>:
                        <img alt="Playing" src={Playingimage}/>
                }
            </ShowReady>
        )
    }

    return (
        <>
            <Container>
                <NickName style={MyNickname}>{user_nick}</NickName>
                <VideoContent>
                    {loading && < Load></Load>}
                    <VideoStyle autoPlay ref={userVideo} />
                </VideoContent>
            </Container>
            <HPContainer>
                <HPContent>
                    {modelsLoaded && myStream && myStream.id && <ShowStatus myStreamID={myStream.id}></ShowStatus>}
                </HPContent>
            </HPContainer>
            <ShowMyReady></ShowMyReady>
        </>
    );
}

export { initialHP };
export default MyVideo;