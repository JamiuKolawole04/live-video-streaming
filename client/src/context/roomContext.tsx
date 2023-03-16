import { createContext, ReactNode } from "react";
import socketIO from "socket.io-client";

const serverURL = "http://localhost:8080";
export const RoomContext = createContext<null | any>(null);

const webSocket = socketIO(serverURL);

interface Children {
  children: ReactNode;
}

export const RoomProvider = ({ children }: Children): JSX.Element => {
  // const enterRoom = ({ roomId }: RoomId) => {
  //   console.log({ roomId });
  //   console.log(roomId);
  // };

  // useEffect(() => {
  //   webSocket.on("room-created", enterRoom);
  // }, []);

  return (
    <RoomContext.Provider value={{ webSocket }}>
      {children}
    </RoomContext.Provider>
  );
};
