const Block = require("./block");

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
    expect(block.hash.substring(0, block.difficulty)).toEqual(
      "0".repeat(block.difficulty)
    );
  });
  it("it lowers the difficulty for slowly mined blocks", () => {
    expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(
      block.difficulty - 1
    );
  });
  it("it raises the difficulty for fast mined blocks", () => {
    expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(
      block.difficulty + 1
    );
  });
});
