const Block = require('./block');
const fooblock =Block.mineBlock(Block.Genesis(),'food block')
console.log(fooblock.toString())