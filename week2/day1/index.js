const express = require('express')();
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

const PORT = 3000;

io.on('connection', (socket) => {
    console.log('Client', socket.id, 'has connected');
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});