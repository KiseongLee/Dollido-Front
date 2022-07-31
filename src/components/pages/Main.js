import React, { useState } from "react";
import { ThemeProvider } from 'styled-components';


// common import
import Button from "../common/Button.js";
import { Modal } from "../common/Modal.tsx";
import SignIn from "./members/SignIn.js";
import SignUp from "./members/SignUp.js";
import Header from "../common/members/Header";
import { GlobalStyles } from "../common/Global.tsx";
import styled from "styled-components";

// images import
import mainBackground from '../../images/main_Back.gif';

const Word = styled.p `
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: "Black Han Sans";
`

const Main = () => {
    const [modal, setModal] = useState(false);
    const [change, setChange] = useState(true);

    return (
        <div style={{height: "100vh"}}>
            <GlobalStyles bgImage={mainBackground}></GlobalStyles>
            <Button style={ { position: "absolute", bottom: "10%", left: "50%", transform: "translate(-50%, -50%)", width: "25rem", height: "7rem"} } onClick = {() => { setModal(true); }} >
                <Word style={ {fontSize: "2rem"} }> Game Start </Word> 
            </Button>
            {modal ?
                change ?
                    <Modal
                        modal={modal}
                        setModal={setModal}
                        setChange={setChange}
                        width="500"
                        height="520"
                        element={
                            <Header children={<SignIn setChange={setChange}/>} />
                        }
                    />
                    :
                    <Modal
                        modal={modal}
                        setModal={setModal}
                        setChange={setChange}
                        width="500"
                        height="670"
                        element={
                            <Header children={<SignUp setChange={setChange}/>} />
                        }
                    />
            :
            <></>
            }
        </div>
    );
};

export default Main;