const ent = require('ent');

class Channel {
    constructor(io, title){
        this.io = io
        this.title = title // nom du channel
        this.users = [] // liste des users --- Chaque channel gère sa propre liste
    }

    addMessage(user, message){
        message = ent.encode(message);

        this.io.sockets.emit('message:new', { message, room: this.title, nickname: user.nickname })
    }
    
    pushUser(user){
        this.users.push(user);
    }

    removeUser(user){
        this.users.forEach((u, i) => {
            if(user.id === u.id){
                this.users.splice(i, 1);
            }
        })
    }

    getUsersList(){
        return this.users.map(user => user.nickname);
    }

    destroy(){
        this.title = null
        this.users = null
        this.io.disconnect()
    }
}

module.exports = Channel