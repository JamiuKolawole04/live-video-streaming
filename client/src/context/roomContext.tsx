import { createContext, ReactNode, FC } from "react";
import socketIO from "socket.io-client";

type RNode = ReactNode;

const serverURL = "http://localhost:8080";
const RoomContext = createContext<null | any>(null);

const webSocket = socketIO(serverURL);

export const RoomProvider: FC<{ children: RNode }> = ({
  children,
}): JSX.Element => {
  return (
    <RoomContext.Provider value={{ webSocket }}>
      {children}
    </RoomContext.Provider>
  );
};
