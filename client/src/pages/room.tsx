import { useContext, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import { RoomContext } from "../context/roomContext";
import VideoPlayer from "../components/videoPlayer";
import { PeerState } from "../context/peerReducer";
import { ShareScreenButton } from "../components/shareScreenButton";

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

  return (
    <Fragment>
      <div>Room {id}</div>

      <div className="flex">
        {screenSharingVideo && (
          <div className="w-4/5 px-4">
            <VideoPlayer stream={screenSharingVideo} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 ">
        <VideoPlayer stream={stream} />

        {Object.values(peers as PeerState).map((peer, i) => (
          <VideoPlayer stream={peer.stream} key={i} />
        ))}
      </div>

      <div className="fixed bottom-0 p-6 w-full flex justify-center border-t-2">
        <ShareScreenButton onClick={shareScreen} />
      </div>
    </Fragment>
  );
};
