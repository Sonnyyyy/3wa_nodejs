const ent = require('ent')

const User = require('./User')

class Chat {
    constructor(io) {
        this.io = io
        this.users = [] // liste des users
        this.messages = [] // liste des messages
    }

    onConnection(socket) {
        console.log( `Client`, socket.id, 'is connected via WebSockets')
        

        socket.on('message:new', (message) => this._onNewMessage(socket, 'username', message))
    }

    _onNewMessage(socket, user, message) {
        let nickname = ent.encode(message.nickname);
        message = ent.encode(message.message);
        
        this.io.sockets.emit('message:new', {message, nickname})
    }
}

module.exports = Chat
