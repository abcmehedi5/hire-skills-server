const { Server: SocketIOServer } = require("socket.io");
const { createServer } = require("http");
const { MessageModel } = require("../models/message/message.model");

let io;
const userSocketMap = new Map();
const onlineUsers = new Set();

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

    socket.on("register", (email) => {
      if (email) {
        userSocketMap.set(email, socket.id);
        onlineUsers.add(email);
        io.emit("online_users", Array.from(onlineUsers));
      } else {
        console.log("Email is null or undefined");
      }
    });

    socket.on(
      "send_private_message",
      async ({ recipientEmail, message, senderEmail }) => {
        const userSocketId = userSocketMap.get(recipientEmail);

        if (userSocketId) {
          io.to(userSocketId).emit("received_private_message", {
            sender: senderEmail,
            message,
          });

          // Find and load messages for the recipient and sender
          const messages = await MessageModel.find({
            $or: [
              { email: senderEmail, recipient: recipientEmail },
              { email: recipientEmail, recipient: senderEmail },
            ],
          }).sort({ createdAt: 1 });

          // Emit the loaded messages to the sender and recipient
          io.to(socket.id).emit("load_messages", messages);
          io.to(userSocketId).emit("load_messages", messages);

          io.to(userSocketId).emit("notification", {
            sender: senderEmail,
            message: "New message received",
          });
          console.log(`Message sent to socket ID: ${userSocketId}`);
        } else {
          console.log(`User with email ${recipientEmail} not found`);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      userSocketMap.forEach((value, key) => {
        if (value === socket.id) {
          userSocketMap.delete(key);
          onlineUsers.delete(key);
          io.emit("online_users", Array.from(onlineUsers));
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
  return userSocketMap.get(email);
};

module.exports = { initSocketIo, getIoInstance, getUserSocketId, io };
