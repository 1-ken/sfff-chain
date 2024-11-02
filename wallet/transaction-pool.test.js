const TransactionPool = require("./transaction-pool");
const Wallet = require("./index");
const Transaction = require("./transaction");
describe("TransactionPool", () => {
  let tp, wallet, transaction;
  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction = Transaction.newTransaction(wallet, "ds-sds-d55", 30);
    tp.updateOrAddTransactions(transaction);
  });
  it("adds a transaction to the pool", () => {
    expect(tp.transactions.find((t) => t.id === transaction.id)).toEqual(
      transaction
    );
  });
  it("updates a transaction in the pool", () => {
    const oldTransaction = JSON.stringify(transaction);
    const newTransaction = transaction.update(
      wallet,
      "d4fdf-fd1-d55",
      40
    );
    tp.updateOrAddTransactions(newTransaction);

    expect(
      JSON.stringify(tp.transactions.find((t) => t.id === newTransaction.id))
    ).not.toEqual(oldTransaction);
  });
});
