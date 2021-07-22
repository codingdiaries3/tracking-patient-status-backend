const app = require("express")();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 3000;
const option = {
  cors: {
    origin: "http://localhost:3001",
    method: ["GET", "POST"],
  },
};

const io = require("socket.io")(server, option);

io.on("connection", (socket) => {
  socket.emit("status", "you just got the emit msg from socket.io");

  socket.on("queue", (queueStatus) => {
    console.log("queueStatus", queueStatus);
    io.emit("SignInQueueUpdate", queueStatus);
  });

  socket.on("clinicQueueUpdate", (queueStatus) => {
    console.log("clinic queue status", queueStatus);
    io.emit("clinicNewQueue", queueStatus);
  });
});

// connecting to server
server.listen(PORT, () => {
  console.log(`listening in port ${PORT}`);
});
