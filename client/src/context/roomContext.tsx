import { createContext, ReactNode, useState, useEffect } from "react";
import socketIO from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

const serverURL = "http://localhost:8080";
export const RoomContext = createContext<null | any>(null);

const webSocket = socketIO(serverURL);

interface Children {
  children: ReactNode;
}

export const RoomProvider = ({ children }: Children): JSX.Element => {
  const [me, setMe] = useState<Peer>();

  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log({ participants });
  };

  useEffect(() => {
    const meId: string = uuidV4();
    const peer = new Peer(meId);
    setMe(peer);

    webSocket.on("get-users", getUsers);
  }, []);

  return (
    <RoomContext.Provider value={{ webSocket, me }}>
      {children}
    </RoomContext.Provider>
  );
};
