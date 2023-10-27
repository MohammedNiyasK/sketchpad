import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://sketchpad-server-mbo7.onrender.com";

export const socket = io(URL);
