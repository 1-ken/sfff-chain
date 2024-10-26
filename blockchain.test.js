const Blockchain = require("./blockchain");
const Block = require("./block");
describe("Blockchain", () => {
  let bc;
  beforeEach(() => {
    bc = new Blockchain();
  });
  it("starts with a genesis block", () => {
    expect(bc.chain[0]).toEqual(Block.Genesis());
  });
  it("adds a new block to the blockchain", () => {
    const data = "foo";
    bc.addBock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });
});
