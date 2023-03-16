import { useParams } from "react-router-dom";

export const Room = () => {
  const { id } = useParams();
  return <div>Room {id}</div>;
};
