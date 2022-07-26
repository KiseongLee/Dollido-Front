import { useEffect } from "react";

// redux import
import { useSelector, useDispatch } from "react-redux";
import {
    setChief,
    setChiefStream,
    setGameFinish,
    setGamestart,
    setReadyList,
    setRoomID,
    clearReadyList
} from "../../../modules/inGame";
import { setRandom } from "../../../modules/random";
import { setMyWeapon, setMyWeaponCheck, setMyWeaponImage } from '../../../modules/item';

const InGameSocketOn = ({ match, socket }) => {
    const dispatch = useDispatch();
    const inGameState = useSelector((state) => (state.inGame));
    const myStream = inGameState.myStream;


    // socket on
    useEffect(() => {
        socket.on("wait", ({ status, roomID, chiefStream }) => {
            dispatch(setRoomID(roomID));
            dispatch(setChief(status));
            dispatch(setChiefStream(chiefStream));
        });

        socket.on("chief", ({chiefStream}) => {
            console.log(chiefStream)
            dispatch(setChiefStream(chiefStream));
        });

        socket.on("start", (status, randomList) => {
            if (status) {
                dispatch(setRandom(randomList));
                dispatch(setGamestart(true));
            }
        });

        socket.on("finish", () => {
            dispatch(setGameFinish(true));
        });

        socket.on("ready", ({streamID, isReady}) => {
            dispatch(setReadyList(streamID, isReady));
        });

        socket.on("restart", () => {
            dispatch(clearReadyList());
            dispatch(setGamestart(false));
            dispatch(setGameFinish(false));
            dispatch(setMyWeaponCheck(false));
            dispatch(setMyWeapon(false));

        });

        socket.on('my_weapon', (streamID, randomList, imageServer) => {
            if (myStream && myStream.id){
                if (streamID === myStream.id){
                    dispatch(setMyWeaponCheck(true));
                    dispatch(setMyWeaponImage(imageServer));
                }
            }
            dispatch(setMyWeapon(true));
            dispatch(setRandom(randomList));
        });

        return () => {
            dispatch(clearReadyList());
        }
    }, [match, socket, dispatch]);

    // socket fail on
    useEffect(() => {
        socket.on("make room fail", (handle) => {
            if (!handle.bool) {
                window.location.replace("/lobby");
                alert(handle.msg);
            }
        });

        socket.on("join room fail", (handle) => {
            if (!handle.bool) {
                window.location.href = "/lobby";
                alert(handle.msg);
            }
        });

        socket.on("wait room fail", (handle) => {
            if (!handle.bool) {
                window.location.href = "/lobby";
                alert(handle.msg);
            }
        });

        socket.on("start room fail", (handle) => {
            if (!handle.bool) {
                window.location.href = "/lobby";
                alert(handle.msg);
            }
        });
    });

    return <div></div>;
}

export default InGameSocketOn;