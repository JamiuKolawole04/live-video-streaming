import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId: string = uuidV4();
    socket.emit("room-created", { roomId });

    console.log("user create a room");
  };

  const joinRoom = ({ roomId }: { roomId: string }) => {
    console.log("a user joined room", roomId);
    socket.join(roomId);
  };

  socket.on("join-room", joinRoom);
  socket.on("create-room", createRoom);
};
