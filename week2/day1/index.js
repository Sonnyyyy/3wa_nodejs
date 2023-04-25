const express = require('express');
const http = require("http");
const app = express();
const cors = require('cors');
const path = require('path');
const server = http.Server(app);
const io = require('socket.io')(server, {
  serveClient: true,
});
const PORT = 9000;

app.use(express.json());
app.use(cors());
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Client', socket.id, 'has connected');
});

const routeHome = require("./routes/route")

app.use("/", routeHome);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});