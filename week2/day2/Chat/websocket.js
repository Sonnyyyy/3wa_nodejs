const Chat = require('./public/scripts/Chat')

module.exports = function(app, io) {

    const chat = new Chat(io)
    io.on('connection', (socket) => {
        chat.onConnection(socket)
    })
}