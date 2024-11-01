const Wallet = require(".");
const chainUtil = require("../chain-util");

class Transaction {
  constructor() {
    this.id = chainUtil.id();
    this.input = null;
    this.outputs = [];
  }
  static newTransaction(senderWallet, recipient, amount) {
    const transaction = new this();
    if (amount > senderWallet.balance) {
      console.log(`Amount ${amount} exceeds balance.`);
      return null;
    }
    transaction.outputs.push(
      ...[
        {
          amount: senderWallet.balance - amount,
          address: senderWallet.publicKey,
        },
        { amount, address: recipient },
      ]
    );
    Transaction.signTransaction(transaction, senderWallet);
    return transaction;
  }
  static signTransaction(transaction, senderWallet) {
    transaction.input = {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(chainUtil.hash(transaction.outputs)),
    };
  }
  static verifyTransaction(transaction) {
    return chainUtil.VerifySignature(
      transaction.input.address,
      transaction.input.signature,
      chainUtil.hash(transaction.outputs)
    );
  }
}
module.exports = Transaction;
