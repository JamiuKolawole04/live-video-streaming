import { IMessage } from "../../types/chat";

interface Message {
  message: IMessage;
}

export const ChatBubble = ({ message }: Message) => {
  return <div>{message.content}</div>;
};
