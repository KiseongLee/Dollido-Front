import React from "react";
import styled from "styled-components";

import InGameContent from "./InGameContent";
import MyVideo from "./MyVideo";
import Video from "./PeerVideo";
import HP from "./HP";
import IsReady from "./IsReady";
import Bottom from "./Bottom";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 20;
`

const LeftContent = styled.div`
    flex: 1;
`

const MidleContent = styled.div`
    flex: 1.5;
`

const RightContent = styled.div`
    flex: 1;
`

const Content = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`

const EachContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 15px;
    height: 50%;
    text-align: center;
`

const Test = ({socket, match}) => {
    return (
        <Container>
            <LeftContent>
                <EachContent>
                    <MyVideo socket={socket} match={match}></MyVideo>
                </EachContent>
                <EachContent>
                    <Video index={0}></Video>
                    <HP index={0}></HP>
                    <IsReady index={0}></IsReady>
                </EachContent>
            </LeftContent>
            <MidleContent>
                <Content>
                    <InGameContent socket={socket}></InGameContent>
                    <Bottom socket={socket} match={match}></Bottom>
                </Content>
            </MidleContent>
            <RightContent>
                <EachContent>
                    <Video index={1}></Video>
                    <HP index={1}></HP>
                    <IsReady index={1}></IsReady>
                </EachContent>
                <EachContent>
                    <Video index={2}></Video>
                    <HP index={2}></HP>
                    <IsReady index={2}></IsReady>
                </EachContent>
            </RightContent>
        </Container>
    );
}

export default Test;