const Wallet = require("./index");
const Transaction = require("./transaction");

describe("Transaction", () => {
  let transaction, wallet, recipient, amount;
  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = "rec1p13nt";
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });
  it("outputs the `amount` subtracted from the wallet balance", () => {
    expect(
      transaction.outputs.find((output) => output.address === wallet.publicKey)
        .amount
    ).toEqual(wallet.balance - amount);
  });
  it("outputs the `amount` added to the recipient account", () => {
    expect(
      transaction.outputs.find((output) => output.address === recipient).amount
    ).toEqual(amount);
  });
  it("inputs balance of the wallet", () => {
    expect(transaction.input.amount).toEqual(wallet.balance);
  });
  describe("transacting with amount exceeding th user balance", () => {
    beforeEach(() => {
      amount = 5000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });
    it("does not create a new transaction", () => {
      expect(transaction).toBeNull();
    });
  });
});
