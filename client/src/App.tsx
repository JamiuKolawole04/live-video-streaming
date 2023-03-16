import { useEffect } from "react";
import socketIO from "socket.io-client";

import "./App.css";

const serverURL: string = "http://localhost:8080";

function App() {
  useEffect(() => {
    socketIO(serverURL);
  }, []);

  return (
    <div className="App">
      <button className="bg-rose-400 py-2 px-8">Start new meeting</button>
    </div>
  );
}

export default App;
