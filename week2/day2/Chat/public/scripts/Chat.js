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
        let user = new User(socket, 'username');
        this.users.push(user);
        socket.on('user:new', (nickname) => {console.log(nickname); this._onNewUser(nickname)})
        socket.on('message:new', (message) => this._onNewMessage(socket, 'username', message))
    }

    _onNewMessage(socket, user, message) {
        let nickname = ent.encode(message.nickname);
        message = ent.encode(message.message);
        
        this.io.sockets.emit('message:new', {message, nickname})
    }

    _onNewUser(nickname){
        nickname = ent.encode(nickname.nickname);

        this.io.sockets.emit('user:new', {nickname});
    }
}

module.exports = Chat
