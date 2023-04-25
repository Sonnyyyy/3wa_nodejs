class Client {
  constructor(){

    this.socket = io.connect('/');
    this.nickname = window.prompt('Choississez un pseudo');

    this.$form = $('form#chat');
    this.$message = $('input#message');
    this.messages = $('ul#messages');

    this.socket.on('message:new', ({nickname, message}) => this.receiveMessage(nickname, message));
  }

  init(){
    this.$form.on('submit', (event) => {
      event.preventDeault();
      this.sendMessage(this.$message.val());
    })
  }
}