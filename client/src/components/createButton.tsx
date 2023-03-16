import { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { RoomContext } from "../context/roomContext";

interface RoomId {
  roomId: string;
}

export const CreateButton = () => {
  const navigate = useNavigate();
  const { webSocket } = useContext(RoomContext);
  // create room with socket
  const createRoom = () => {
    webSocket.emit("create-room");
  };

  const enterRoom = useCallback(
    ({ roomId }: RoomId) => {
      navigate(`/room/${roomId}`);
    },
    [navigate]
  );

  useEffect(() => {
    webSocket.on("room-created", enterRoom);
  }, [webSocket, enterRoom]);

  return (
    <button
      className="bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600 text-white"
      onClick={createRoom}
    >
      Start new meeting
    </button>
  );
};
