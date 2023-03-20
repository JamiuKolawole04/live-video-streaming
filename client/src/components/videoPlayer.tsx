import React, { useRef, useEffect } from "react";
import { Stream } from "stream";

const VideoPlayer: React.FC<{ stream: MediaStream }> = ({ stream }) => {
  const videRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videRef.current) {
      videRef.current.srcObject = stream;
    }
  }, []);

  return <video ref={videRef} autoPlay muted={false}></video>;
};

export default VideoPlayer;
