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
let sockets = [];

io.on("connection", socket => {
  socket.on("disconnect", () => console.log("Client disconnected"));
  sockets.push(socket);
  console.log(socket);
});

fs.watch('./value.txt', (event, filename)=>{
  console.log(event);
  let V = fs.readFileSync('./value.txt', "utf8");
  console.log('***', V);
  for(i in sockets) {
    sockets[i].emit("FromAPI", V);
  }
      
});


server.listen(port, () => console.log(`Listening on port ${port}`));
