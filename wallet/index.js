const chainUtil = require("../chain-util");
const { INITIAL_BALANCE } = require("../config");
class Wallet {
  constructor() {
      this.keyPair = chainUtil.genKeyPair();
      this.publicKey = this.keyPair.getPublic().encode('hex');
    this.balance = INITIAL_BALANCE;
  }
  toString() {
    return `Wallet -
    publicKey:${this.publicKey}
    balance: ${this.balance}
    `;
  }
}
module.exports = Wallet;