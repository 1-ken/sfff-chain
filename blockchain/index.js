const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [Block.Genesis()];
  }

  addBock(data) {
    const lastBlock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(lastBlock, data);
    this.chain.push(block);

    return block;
  }
  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.Genesis())) return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];
      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        return false;
      }
    }
    return true;
  }
  replaceChain(newChain){
    if(newChain.length <= this.chain.length){
        console.log('Received chain is not longer than the the current chain');
        return;
    }
    if(!this.isValidChain(newChain)){
        console.log('the received chain is not valid');
        return;
    }
    console.log('replacing the block with the nex change');
    this.chain = newChain;
  }
}
module.exports = Blockchain;
