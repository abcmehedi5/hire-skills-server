const { Server: SocketIOServer } = require("socket.io");
const { createServer } = require("http");

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
      if (email) {
        userSocketMap.set(email, socket.id);
      } else {
        console.log("Email is null or undefined");
      }
    });

    socket.on("send_private_message", ({ recipientEmail, message }) => {
      const userSocketId = userSocketMap.get(recipientEmail);
      
      if (userSocketId) {
        io.to(userSocketId).emit("received_private_message", {
          sender: socket.id,
          message,
        });
        console.log(`Message sent to socket ID: ${userSocketId}`);
      } else {
        console.log(`User with email ${recipientEmail} not found`);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
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
  return userSocketMap.get(email);
};

module.exports = { initSocketIo, getIoInstance, getUserSocketId, io };
