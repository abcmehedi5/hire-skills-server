const { Server: SocketIOServer } = require("socket.io");
const { createServer } = require("http");
// import { NotificationModel } from "../models/notification/notification.model";

let io;
const userSocketMap = new Map();

const initSocketIo = (app) => {
  const server = createServer(app);

  io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:3000", "https://deverp.ccbd.dev"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("register", async (email) => {
      userSocketMap.set(email, socket.id);

      // Load notification data
      // const notifications = await NotificationModel.find({ email })
      //   .sort({ createdAt: -1 })
      //   .limit(10);
      // socket.emit("loadNotifications", notifications);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      // Remove each user
      userSocketMap.forEach((value, key) => {
        if (value === socket.id) {
          userSocketMap.delete(key);
          console.log(`Removed user with email: ${key}`);
        }
      });
      console.log(
        "Current userSocketMap after disconnect:",
        Array.from(userSocketMap.entries())
      );
    });
  });

  return server;
};

const getIoInstance = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

const getUserSocketId = (email) => {
  const socketId = userSocketMap.get(email);
  return socketId;
};

module.exports = { initSocketIo, getIoInstance, getUserSocketId, io };
