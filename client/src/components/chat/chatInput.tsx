import { useState } from "react";

export const ChatInput = (): JSX.Element => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <form>
        <textarea
          className="border rounded"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
