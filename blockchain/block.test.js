const Block = require("./block");
const DIFFICULTY = require("../config");

describe("block", () => {
  let data, lastblock, block;
  beforeEach(() => {
    data = "keen";
    lastblock = Block.Genesis();
    block = Block.mineBlock(lastblock, data);
  });

  it("sets the `data` to match the input", () => {
    expect(block.data).toEqual(data);
  });

  it("it sets `lastHash` to match the hash of the last block", () => {
    expect(block.lastHash).toEqual(lastblock.hash);
  });
  it("generates the hash that matches the difficulty", () => {
    expect(block.hash.substring(0, DIFFICULTY)).toEqual("0".repeat(DIFFICULTY));
    console.log(block.toString());
  });
});
