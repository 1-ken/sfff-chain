const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timestamp, lastHash, hash, data) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
  toString() {
    return `
        TimeStamp:${this.timestamp}
        LastHash:${this.lastHash.substring(0, 10)}
        Hash:${this.hash.substring(0, 10)}
        Data: ${this.data}
        `;
  }
  static Genesis() {
    return new this("genesis time", "-------", "f1r57-h145h", []);
  }
  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`).toString();
  }
  static blockHash(block) {
    const { timestamp, lastHash, data } = block;
    return Block.hash(timestamp, lastHash, data);
  }

  static mineBlock(lastBlock, data) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = Block.hash(timestamp, lastHash, data);
    return new this(timestamp, lastHash, hash, data);
  }
}
module.exports = Block;
