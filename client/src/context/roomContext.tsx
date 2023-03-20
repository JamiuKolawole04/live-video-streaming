import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useReducer,
} from "react";
import socketIO from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

import { peersReducer } from "./peerReducer";
import { addPeerAction } from "./peerActions";

const serverURL = "http://localhost:8080";
export const RoomContext = createContext<null | any>(null);

const webSocket = socketIO(serverURL);

interface Children {
  children: ReactNode;
}

export const RoomProvider = ({ children }: Children): JSX.Element => {
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peersReducer, {});

  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log({ participants });
  };

  useEffect(() => {
    const meId: string = uuidV4();
    const peer = new Peer(meId);
    setMe(peer);

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
        });
    } catch (err) {
      console.log(err);
    }

    webSocket.on("get-users", getUsers);
  }, []);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;

    // initiating call
    webSocket.on("user-joined", ({ peerId }) => {
      const call = me.call(peerId, stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      });
    });

    // answering call
    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);

  console.log({ peers });

  return (
    <RoomContext.Provider value={{ webSocket, me, stream }}>
      {children}
    </RoomContext.Provider>
  );
};
