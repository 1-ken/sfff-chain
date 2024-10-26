const Blockchain = require("./blockchain");
const Block = require("./block");
describe("Blockchain", () => {
  let bc, bc2;
  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });
  it("starts with a genesis block", () => {
    expect(bc.chain[0]).toEqual(Block.Genesis());
  });
  it("adds a new block to the blockchain", () => {
    const data = "foo";
    bc.addBock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });
  it("validates a valid chain", () => {
    bc2.addBock("foo");
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });
  it("replace the chain with a valid chain", () => {
    bc2.addBock("goo");
    bc.replaceChain(bc2.chain);

    expect(bc.chain).toEqual(bc2.chain);
  });
  it('does not replace teh chain with one or less than equal to the length',()=>{
    bc.addBock('foo'); 
    bc.replaceChain(bc2.chain)

    expect(bc.chain).not.toEqual(bc2.chain)
  })
});
