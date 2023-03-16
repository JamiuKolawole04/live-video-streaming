import express from "express";
import http from "http";

const app = express();
const PORT = 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
