"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const PORT = 5000;
const server = http_1.default.createServer(app);
server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
