const { Server } = require("socket.io");

class Socket {
  constructor() {
    try {
      const io = new Server(process.env.port || 3001, {});
    
      this.socket = io;
    } catch (error) {
      console.error(error)
    }
  
  }

  sendMessage(message, data) {
    try {
    this.socket.emit(message, data);
      
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = new Socket();
