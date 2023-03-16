import { useEffect } from "react";
import socketIO from "socket.io-client";

import logo from "./logo.svg";
import "./App.css";

const serverURL: string = "http://localhost:8080";

function App() {
  useEffect(() => {
    socketIO(serverURL);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
