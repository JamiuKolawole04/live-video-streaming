import { useContext } from "react";

import { RoomContext } from "../context/roomContext";

export const CreateButton = () => {
  const { webSocket } = useContext(RoomContext);
  const createRoom = () => {
    webSocket.emit("create-room");
  };

  return (
    <button
      className="bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600 text-white"
      onClick={createRoom}
    >
      Start new meeting
    </button>
  );
};
