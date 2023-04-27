const Chat = require('./app/Chat')
const Channel = require('./app/Channel')

module.exports = function(app, io) {

    const channels = []
    channels.push(new Channel(io, "General"));
    channels.push(new Channel(io, "Graphisme"));
    channels.push(new Channel(io, "Developpement"));

    // Création d'un nouvel objet Chat, pour la gestion des sockets
    const chat = new Chat(io, channels);
    io.on('connection', (socket) => {
        chat.onConnection(socket)
    })

}

