import { useContext, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import { RoomContext } from "../context/roomContext";
import VideoPlayer from "../components/videoPlayer";
import { PeerState } from "../context/peerReducer";

export const Room = (): JSX.Element => {
  const { id } = useParams();
  const { webSocket, me, stream, peers } = useContext(RoomContext);

  useEffect(() => {
    webSocket.emit("join-room", { roomId: id, peerId: me?._id });
  }, [id, webSocket, me?._id]);

  return (
    <Fragment>
      <div>Room {id}</div>

      <div className="grid grid-cols-4 gap-4 ">
        <VideoPlayer stream={stream} />

        {Object.values(peers as PeerState).map((peer, i) => (
          <VideoPlayer stream={peer.stream} key={i} />
        ))}
      </div>
    </Fragment>
  );
};
