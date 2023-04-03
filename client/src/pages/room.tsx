import { useContext, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import { RoomContext } from "../context/roomContext";
import VideoPlayer from "../components/videoPlayer";
import { PeerState } from "../context/peerReducer";
import { ShareScreenButton } from "../components/shareScreenButton";
import { ChatButton } from "../components/chatButton";
import { Chat } from "../components/chat/chat";

export const Room = (): JSX.Element => {
  const { id } = useParams();
  const {
    webSocket,
    me,
    stream,
    peers,
    shareScreen,
    screenSharingId,
    setRoomId,
  } = useContext(RoomContext);

  useEffect(() => {
    webSocket.emit("join-room", { roomId: id, peerId: me?._id });
  }, [id, webSocket, me?._id]);

  console.log({ screenSharingId });

  const screenSharingVideo =
    screenSharingId === me?.id ? stream : peers[screenSharingId]?.stream;

  useEffect(() => {
    setRoomId(id);
  }, [id, setRoomId]);

  const { [screenSharingId]: string, ...peerToShow } = peers;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-red-500 p-4 text-white">Room {id}</div>

      <div className="flex grow">
        {screenSharingVideo && (
          <div className="w-4/5 px-4">
            <VideoPlayer stream={screenSharingVideo} />
          </div>
        )}

        <div
          className={`grid gap-4 ${
            screenSharingVideo ? "w-1/5 grid-cols-1" : "grid-cols-4"
          } `}
        >
          {/* stream video with duplicate */}
          {/* <VideoPlayer stream={stream} /> */}

          {/* stream video without duplicate */}
          {screenSharingId !== me?.id && <VideoPlayer stream={stream} />}

          {/* peers object */}
          {/* {Object.values(peers as PeerState).map((peer, i) => (
            <VideoPlayer stream={peer.stream} key={i} />
          ))} */}

          {/* destructured peers object */}
          {Object.values(peerToShow as PeerState).map((peer, i) => (
            <VideoPlayer stream={peer.stream} key={i} />
          ))}
        </div>

        <div className="border-l-2 pb-28">
          <Chat />
        </div>
      </div>

      <div className="h-28 fixed items-center bottom-0 p-6 w-full flex justify-center border-t-2 bg-white">
        <ShareScreenButton onClick={shareScreen} />
        <ChatButton onClick={shareScreen} />
      </div>
    </div>
  );
};
