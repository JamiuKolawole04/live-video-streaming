import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const PORT = 8080;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "OPTIONS", "PUT", "DELETE"],
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

io.on("connection", (socket) => {
  console.log("user is connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
