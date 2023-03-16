import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { RoomProvider } from "./context/roomContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RoomProvider>
      <App />
    </RoomProvider>
  </React.StrictMode>
);
