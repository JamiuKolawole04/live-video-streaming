import React, { useRef, useEffect } from "react";

const VideoPlayer: React.FC<{ stream: MediaStream }> = ({ stream }) => {
  const videRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videRef.current) {
      videRef.current.srcObject = stream;
    }
  }, [stream]);

  return <video ref={videRef} autoPlay muted={true}></video>;
};

export default VideoPlayer;
