import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { RoomContext } from "../context/roomContext";

export const Room = () => {
  const { id } = useParams();
  const { webSocket } = useContext(RoomContext);

  useEffect(() => {
    webSocket.emit("join-room", { roomId: id });
  }, []);

  return <div>Room {id}</div>;
};
