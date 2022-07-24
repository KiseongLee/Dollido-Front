import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// redux import
import { useSelector } from "react-redux";

const Container = styled.div`
    flex: 13;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const NickName = styled.h2`
    flex: 1;
    color: white;
`

const VideoStyle = styled.video`
    flex: 9;
    width: 270px;
    border-radius: 10%;
    justify-content: center;
`

const FindVideo = ({stream}) => {
    const ref = useRef();
    useEffect(() => {
        if(stream.id) ref.current.srcObject = stream;
    }, [stream]);
    return <VideoStyle autoPlay ref={ref} />;
};

const Video = ({index}) => {
    const partnerVideos = useSelector((state) => state.videos);
    const nickName = useSelector((state) => state.inGame.peerNick);
    console.log(nickName)
    return (
        <Container>
            <NickName>{nickName[index]}</NickName>
            {partnerVideos[index] && <FindVideo stream={partnerVideos[index]}></FindVideo>}
        </Container>
    );
}

export default Video;