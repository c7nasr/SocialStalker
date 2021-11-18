import io from "socket.io-client";

export class SocketClient {
  constructor() {
    this.api = "https://s0cialstalker.herokuapp.com/";
    this.isConnected = false;
    this.socket = io(this.api, { transports: ["websocket"] });
  }

  init_socket() {
    return this.socket;
  }

  cleanup() {
    this.socket.disconnect();
  }
}
