const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: {type: String}
});

const messageModel = mongoose.model("Message", messageSchema);

// initialize a new instance of socket.io by passing the server (the HTTP server) object
const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

app.get('/messsages', async function(req, res) {
  res.json(await messagesModel.find());
});

// listen on the connection/disconnection event for incoming sockets and log it to the console
io.on('connection', (socket) => {
  io.emit('new user joined');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    // Save to MongoDB
    const message = new messageModel();
    message.content = msg;
    message.save().then(m => {
      io.emit('chat message', msg);
    })
  });
});

server.listen(3000, async () => {
  await mongoose.connect(
    "mongodb+srv://clu723:Chang723.@cluster0.ra9r3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  ).catch(e => {
    console.log(e)
  });
  console.log('listening on *:3000');
});

