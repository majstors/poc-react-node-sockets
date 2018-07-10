const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const fs = require("fs");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected");
  setInterval(
    () => getApiAndEmit(socket),
    2000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = async socket => {
  try {
    let V = fs.readFileSync('./value.txt', "utf8");
    socket.emit("FromAPI", V);
   
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));
