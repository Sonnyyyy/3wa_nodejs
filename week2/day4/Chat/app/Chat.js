const ent = require('ent')

const User = require('./User')

class Chat {
    constructor(io, channels) {
        this.io = io
        this.messages = [] // Liste des messages
        this.channels = channels // Liste des channels
    }

    onConnection(socket) {
        console.log('Client', socket.id, 'is connected via WebSockets')
        
        socket.once('user:nickname', (nickname) => {
            // Création du nouvel utilisateur
            const user = new User(socket, nickname)
            let channelId = 0;
            // Ajoute cet utilisateur à la liste
            this.channels[channelId].users.push(user)
            // Envoi de la nouvelle liste à tous les sockets connectés
            this.io.sockets.emit('user:list', this.channel[channelId].getUsersList())

            // Mise en place des écouteurs d'événement sur ce socket
            socket.on('channel:change', (newChannelId) => {
                this.channel[channelId].removeUser(user);
                this.io.sockets.emit('user:list', this.channel[channelId].getUsersList());
                channelId = newChannelId;
                this.channel[channelId].pushUser(user);
                this.io.sockets.emit('user:list', this.channel[channelId].getUsersList());
            })
            socket.on('message:new', (message) => this.channel[channelId].addMessage(user, message))
            socket.on('disconnect', () => this._onUserDisconnect(user, channelId))
        })
    }

    _onUserDisconnect(user, channelId) {
        let index = this.channel[channelId].users.indexOf(user)
        if (index > -1) {
            this.users.splice(index, 1)

            user.destroy()

            // Envoi de la nouvelle liste à tous les sockets connectés
            this.io.sockets.emit('user:list', this.channel[channelId].getUsersList())
        }
    }
}

module.exports = Chat
