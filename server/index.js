import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

io.on('connection', (socket) => {
  console.log(`user connected with id ${socket.id}`);
  socket.on('room_join', (roomNo) => {
    console.log(roomNo);
    socket.join(roomNo);
  });
  socket.on('send-message', (data) => {
    // //to send everyone except sender
    // socket.broadcast.emit('recieved-msg', message);
    console.log(data);
    socket.to(data.roomNo).emit('recieved-msg', data.message);
    console.log(data.message);
  });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
