import { IMessage } from "../../types/chat";
import { ChatBubble } from "./chatBubble";
import { ChatInput } from "./chatInput";

export const Chat = () => {
  const messages: IMessage[] = [
    {
      author: "",
      content: "message 1",
      timestamp: "",
    },
  ];
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        {messages.map((message, i) => (
          <ChatBubble message={message} key={i} />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};
