const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  // receive name from client
  socket.on("send name", (username) => {
    // send name to client
    io.emit("send name", username);
  });

  // recieve message from client
  socket.on("send message", (chat) => {
    // send message to client
    io.emit("send message", chat);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening at the port: ${PORT}`);
});
