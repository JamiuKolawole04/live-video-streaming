import { useContext, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import { RoomContext } from "../context/roomContext";
import VideoPlayer from "../components/videoPlayer";

export const Room = () => {
  const { id } = useParams();
  const { webSocket, me, stream } = useContext(RoomContext);

  useEffect(() => {
    webSocket.emit("join-room", { roomId: id, peerId: me?._id });
  }, [id, webSocket, me?._id]);

  return (
    <Fragment>
      <div>Room {id}</div>

      <div>
        <VideoPlayer stream={stream} />
      </div>
    </Fragment>
  );
};
