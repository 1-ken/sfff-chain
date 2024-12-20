const Websocket = require("ws");

const P2P_PORT = process.env.P2P_PORT || 5001;
//$HTTP_PORT = 3002, P2P_PORT = 5001, PEERS=WS:localhost/5001,ws:localhost/5002,npm run dev
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2pServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
  }

  listen() {
    const server = new Websocket.Server({ port: P2P_PORT });
    server.on("connection", (socket) => this.connectSocket(socket));

    this.connectToPeers();

    console.log(`listening for peer tp peer connection on ${P2P_PORT}`);
  }
  connectToPeers() {
    peers.forEach((peer) => {
      //ws://localhost:5001
      const socket = new Websocket(peer);
      socket.on("open", () => this.connectSocket(socket));
    });
  }
  connectSocket(socket) {
    this.sockets.push(socket);
    console.log("socket connected");
    this.messageHandler(socket);
    this.senChain(socket)
  }

  messageHandler(socket) {
    socket.on("message", (message) => {
      const data = JSON.parse(message);
      this.blockchain.replaceChain(data);
    });
  }
  senChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }
  syncChain() {
    this.sockets.forEach((socket) => {this.senChain(socket)});
  }
}
module.exports = P2pServer;
