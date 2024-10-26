const Block = require('./block')
describe('block',()=>{
    let data,lastblock,block;
    beforeEach(()=>{
        data = 'bar';
        lastblock = Block.Genesis();
        block = Block.mineBlock(lastblock,data)
    });

    it('sets the `data` to match the input',()=>{
        expect(block.data).toEqual(data);
    })

    it('it sets `lastHash` to match the hash of the last block',()=>{
        expect(block.lastHash).toEqual(lastblock.hash);
    })
})