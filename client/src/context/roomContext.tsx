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
import { addPeerAction, removePeerAction } from "./peerActions";

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
  const [screenSharingId, setScreenSharingId] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log({ participants });
  };

  const removePeer = (peerId: string) => {
    dispatch(removePeerAction(peerId));
  };

  const switchScreen = (stream: MediaStream) => {
    setStream(stream);
    setScreenSharingId(me?.id || "");

    Object.values(me?.connections).forEach((connection: any) => {
      const videoTrack = stream
        ?.getTracks()
        .find((track) => track.kind === "video");

      connection[0].peerConnection
        .getSenders()[1]
        .replaceTrack(videoTrack)
        .catch((err: any) => console.error(err));
    });
  };

  const shareScreen = () => {
    // get a stream video from the display of user not from the webcam
    // navigator.mediaDevices.getDisplayMedia({}).then((stream) => {
    //   setStream(stream);
    // });

    if (screenSharingId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(switchScreen);
    } else {
      navigator.mediaDevices.getDisplayMedia({}).then(switchScreen);
    }
  };

  useEffect(() => {
    const meId: string = uuidV4();
    const peer = new Peer(meId, {
      host: "localhost",
      port: 9000,
      path: "/myapp",
    });
    setMe(peer);

    try {
      // get display of user from webcam
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
        });
    } catch (err) {
      console.log(err);
    }

    webSocket.on("get-users", getUsers);
    webSocket.on("disconnect", removePeer);
    webSocket.on("user-started-sharing", (peerId) =>
      setScreenSharingId(peerId)
    );
    webSocket.on("user-stopped-sharing", () => setScreenSharingId(""));

    return () => {
      webSocket.off("room-created");
      webSocket.off("get-users");
      webSocket.off("user-disconnected");
      webSocket.off("user-started-sharing");
      webSocket.off("user-stopped-sharing");
      webSocket.off("user-joined");
    };
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

  useEffect(() => {
    if (screenSharingId) {
      webSocket.emit("start-sharing", { roomId, peerId: screenSharingId });
    } else {
      webSocket.emit("stop-sharing");
    }
  }, [screenSharingId, roomId]);

  console.log({ peers });

  return (
    <RoomContext.Provider
      value={{
        webSocket,
        me,
        stream,
        peers,
        shareScreen,
        screenSharingId,
        setRoomId,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
