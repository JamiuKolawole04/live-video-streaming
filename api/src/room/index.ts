import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

interface IRoomParams {
  roomId: string;
  peerId: string;
}

const rooms: Record<string, string[]> = {};

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId: string = uuidV4();
    rooms[roomId] = [];
    socket.emit("room-created", { roomId });

    console.log("user create a room");
  };

  const joinRoom = ({ roomId, peerId }: IRoomParams) => {
    if (rooms[roomId]) {
      console.log("a user joined room", { roomId, peerId });
      rooms[roomId].push(peerId);
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", { peerId });
      socket.emit("get-users", {
        roomId,
        participants: rooms[roomId],
      });
    }

    socket.on("disconnect", () => {
      console.log("user left the room", { peerId });
      leaveRoom({ roomId, peerId });
    });
  };

  const leaveRoom = ({ roomId, peerId }: IRoomParams) => {
    rooms[roomId] = rooms[roomId]?.filter((id) => id !== peerId);
    socket.to(roomId).emit("user-diconnected", peerId);
  };

  socket.on("join-room", joinRoom);
  socket.on("create-room", createRoom);
};
