import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

interface IRoomParams {
  peerId: string;
  roomId: string;
}

const rooms: Record<string, string[]> = {};

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId: string = uuidV4();
    rooms[roomId] = [];
    socket.emit("room-created", { roomId });

    console.log("user create a room");
  };

  const joinRoom = ({ peerId, roomId }: IRoomParams) => {
    if (rooms[roomId]) {
      console.log("a user joined room", { roomId, peerId });
      if (peerId !== null) {
        rooms[roomId].push(peerId);
        console.log({ rooms });
      }
      // rooms[roomId].push(peerId);
      // console.log({ rooms });

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

  const startSharing = ({ roomId, peerId }: IRoomParams) => {
    socket.to(roomId).emit("user-started-sharing", peerId);
  };
  const stopSharing = (roomId: string) => {
    socket.to(roomId).emit("user-stopped-sharing");
  };

  socket.on("start-sharing", startSharing);
  socket.on("stop-sharing", stopSharing);
};
