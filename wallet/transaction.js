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
    return transaction;
  }
  
}
module.exports = Transaction