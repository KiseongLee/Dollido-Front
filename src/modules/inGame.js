const SET_MODELS_LOADED = "inGame/SET_MODELS_LOADED";
const SET_GAME_FINISH = "inGame/SET_GAME_FINISH";
const SET_GAME_START = "inGame/SET_GAME_START";
const SET_MY_STREAM = "inGame/SET_MY_STREAM";
const SET_PEER_NICK = "inGame/SET_PEER_NICK";
const CLEAR_PEER_NICK = "inGame/CLEAR_PEER_NICK";
const DELETE_PEER_NICK = "inGame/DELETE_PEER_NICK"
const SET_ROOM_ID = "inGame/SET_ROOM_ID";
const SET_CHIEF = "inGame/SET_CHIEF";
const SET_CHIEF_STREAM = "inGame/SET_CHIEF_STREAM";
const SET_READY_LIST = "inGame/SET_READY_LIST";
const CLEAR_READY_LIST = "inGame/CLEAR_READY_LIST";


export const setModelsLoaded = (bool) => ({type: SET_MODELS_LOADED, bool});
export const setGameFinish = (bool) => ({type: SET_GAME_FINISH, bool});
export const setGamestart = (bool) => ({type: SET_GAME_START, bool});
export const setMyStream = (stream) => ({type: SET_MY_STREAM, stream});
export const setPeerNick = (nickName) => ({type: SET_PEER_NICK, nickName});
export const clearPeerNick = () => ({type: CLEAR_PEER_NICK});
export const deletePeerNick = (nickName) => ({type: DELETE_PEER_NICK, nickName});
export const setRoomID = (roomID) => ({type: SET_ROOM_ID, roomID});
export const setChief = (bool) => ({type: SET_CHIEF, bool});
export const setChiefStream = (streamID) => ({type: SET_CHIEF_STREAM, streamID});
export const setReadyList = (streamID, bool) => ({type: SET_READY_LIST, streamID, bool});
export const clearReadyList = () => ({type: CLEAR_READY_LIST});

const initialState = {
    gameFinished: false,
    gameStarted: false,
    modelsLoaded: false,
    myStream: null,
    peerNick: [], 
    roomID: null,
    chief: false,
    chiefStream: null,
    readyList: {}
}

export default function inGame(state = initialState, action) {
    switch(action.type) {
        case SET_MODELS_LOADED:
            return { ...state, modelsLoaded: action.bool };
        case SET_GAME_FINISH:
            return { ...state, gameFinished: action.bool};
        case SET_GAME_START:
            return { ...state, gameStarted: action.bool};
        case SET_MY_STREAM:
            return { ...state, myStream: action.stream};
        case SET_PEER_NICK:
            const peerList = [...state.peerNick, action.nickName];
            const peerFilter = peerList.filter((val) => val !== undefined);
            return {...state , peerNick: peerFilter};
        case CLEAR_PEER_NICK:
            return {...state, peerNick: []};
        case DELETE_PEER_NICK:
            const peerDelete = state.peerNick.filter((val) => val !== action.nickName);
            return {...state, peerNick: peerDelete}
        case SET_ROOM_ID:
            return { ...state, roomID: action.roomID };
        case SET_CHIEF:
            return { ...state, chief: action.bool };
        case SET_CHIEF_STREAM:
            return { ...state, chiefStream: action.streamID };
        case SET_READY_LIST:
            state.readyList[action.streamID] = action.bool;
            return { ...state, ...state.readyList};
        case CLEAR_READY_LIST:
            return  { ...state, readyList: {} }
        default:
            return state;
    }
}