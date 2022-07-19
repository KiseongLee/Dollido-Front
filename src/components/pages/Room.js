import React from "react";
import Videos from "./Videos";
import io from "socket.io-client";
import { ServerName } from "../../serverName";

const SERVER_ADDRESS = ServerName;
const socket = io(SERVER_ADDRESS, {
  withCredentials: false,
  extraHeaders: {
    "dollido-header": "dollido",
  },
});

function Room({ match }) {
  return (
    <div>
      <Videos match={match} socket={socket} />
    </div>
  );
}

export default Room;
