import { io } from "socket.io-client";

export const socket = io('http://192.168.0.159:3000', { transports: ['websocket'] })
