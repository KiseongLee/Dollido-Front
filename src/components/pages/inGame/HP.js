import { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import effect from "../../../images/pepe-laugh-laugh.gif";
import styled from "styled-components";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Container = styled.div`
    display: flex;
    width: 320px;
    color: white;
    justify-content: center;
    margin-top: 20px;
`

const Content = styled.div`
    width: 80%;
`

const ImgStyle1 = styled.img`
  position: absolute; 
  width: auto;
  height: auto; 
  top: 10%; 
  right: 8%;
  transform: scaleX(-1); 
`

const ImgStyle2 = styled.img`
  position: absolute; 
  width: auto;
  height: auto; 
  top: 10%; 
  left: 8%;
`

const ImgStyle3 = styled.img`
  position: absolute; 
  width: auto;
  height: auto; 
  top: 50%; 
  right: 8%;
  transform: scaleX(-1); 
`

const HP = ({ socket, index }) => {
    const partnerVideos = useSelector((state) => state.videos);
    const peersHP = useRef(100);
    const [content, setContent] = useState(<ProgressBar striped variant="danger" now={peersHP.current} />);

    const effectIndex = (index) => {
      if (index === 0) {
        return <ImgStyle1 src={effect}/>
      } else if (index === 1) {
        return <ImgStyle2 src={effect}/>
      } else if (index === 2) {
        return <ImgStyle3 src={effect}/>
      }
    }

    const hpIndex = () => {
      return <ProgressBar striped variant="danger" now={peersHP.current} />
    }

    useEffect(() => {
      socket.on("smile", (peerHP, peerStreamID, isJudgement) => {
        if (partnerVideos[index] && partnerVideos[index].id === peerStreamID) {
          
          if (peersHP.current !== peerHP) {
            peersHP.current = peerHP;
            if(!isJudgement) {
              setContent(
                <>
                  {effectIndex(index)}
                  {hpIndex()}
                </>
              )
              setTimeout(() => {
                setContent(hpIndex());
              }, 1000);
            } else {
              setContent(hpIndex());
            }
          } else {
            peersHP.current = peerHP;
            setContent(hpIndex());
          }
        }
      })
      
      socket.on("finish", (hpList) => {
        hpList.map((HP) => {
          if (partnerVideos[index] && partnerVideos[index].id === HP[0]) {
            if (HP[1] < 0) {
              peersHP.current = 0;
            } else {
              peersHP.current = HP[1];
            }
            setContent(hpIndex());
          }
        })
      });

    }, [socket, partnerVideos])

    useEffect(() => {
      socket.on("restart", () => {
        peersHP.current = 100;
        setContent(<ProgressBar striped variant="danger" now={peersHP.current} />);
      })
    }, [socket]);

    return partnerVideos[index] &&
      <Container>
        <Content>
          {content}
        </Content>
      </Container>;
}

export default HP;