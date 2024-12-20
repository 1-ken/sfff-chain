const Wallet = require(".");
const chainUtil = require("../chain-util");

class Transaction {
  constructor() {
    this.id = chainUtil.id();
    this.input = null;
    this.outputs = [];
  }
  update(senderWallet, recipient, amount) {
    const senderOutput = this.outputs.find(
      (output) => output.address === senderWallet.publicKey
    );
    if (amount > senderOutput.amount) {
      console.log(`Amount ${amount} exceeds balance`);
      return;
    }
    senderOutput.amount = senderOutput.amount - amount;
    this.outputs.push({ amount, address: recipient });
    Transaction.verifyTransaction(this, senderWallet);
    return this;
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
