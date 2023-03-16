import { useEffect } from "react";
import socketIO from "socket.io-client";

import "./App.css";
import { CreateButton } from "./components/createButton";

const serverURL: string = "http://localhost:8080";

function App() {
  useEffect(() => {
    socketIO(serverURL);
  }, []);

  return (
    <div className="App justify-center w-screen h-screen flex items-center ">
      {/* <button className="bg-rose-400 py-2 px-8 rounded-lg text-xl hover:bg-rose-600 text-white">
        Start new meeting
      </button> */}
      <CreateButton />
    </div>
  );
}

export default App;
