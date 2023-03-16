"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const room_1 = require("./room");
const app = (0, express_1.default)();
const PORT = 8080;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH", "OPTIONS", "PUT", "DELETE"],
    },
});
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
io.on("connection", (socket) => {
    console.log("user is connected");
    // user joined room handler
    (0, room_1.roomHandler)(socket);
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
