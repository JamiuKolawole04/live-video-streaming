import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { RoomProvider } from "./context/roomContext";
import { Home } from "./pages/home";
import { Room } from "./pages/room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/room/:id",
    element: <Room />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RoomProvider>
      <RouterProvider router={router} />
    </RoomProvider>
  </React.StrictMode>
);
