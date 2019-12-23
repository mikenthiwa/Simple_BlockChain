import sha256 from 'sha256';

class Block {
    constructor(index, data, date, prevHash) {
        this.index = index;
        this.data = data;
        this.date = date;
        this.prevHash = prevHash;
        this.nounce = 0;
        this.hash = sha256(
            this.index + this.data + this.date
        )
    }

}

class BlockChain {
    constructor() {
        this.blockChain = [this.genesisBlock()];
        this.difficulty = 1;
    }

    calculateHash(index, data, date, nounce) {
        return sha256(index + data + date + nounce)
    }
    get date() {
        const now = new Date();
        return now.toISOString();
    }

    genesisBlock() {
        let now = new Date();
        return new Block(1, 'block 1', this.date, '')
    }
    generateBlockChainLength() {
        return this.blockChain.length
    }
    generateNewBlock() {
        let blockChainLength = this.generateBlockChainLength();
        const index = blockChainLength + 1;
        const prevHash = this.blockChain[blockChainLength - 1].hash;

        const newBlock = new Block(index, `block ${index}`, this.date, prevHash);
        let customNounce = 0;
        while(newBlock.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")){
            customNounce ++;
            console.log('mining....')
            newBlock.nounce = customNounce;
            newBlock.hash = this.calculateHash(index, `block ${index}`, this.date, newBlock.nounce)
        }
        this.blockChain.push(newBlock);
    }

    displayBlockChain() {
        return console.log(this.blockChain)
    }


    checkBlockChainValidity(){
        let generatedHash = '';
        let prevHash ='';
        let currentHash = '';
        return this.blockChain.forEach((block, i) => {
            const {index, data, date, hash} = block;
            generatedHash = this.calculateHash(index, data, date);
            if(generatedHash !== hash){
                this.blockChain[i].hash = generatedHash;
                console.log(false)
            }
            if (i > 0) {
                prevHash = this.blockChain[i - 1].hash;
                currentHash = block.prevHash;
                console.log(prevHash === currentHash);
            }
        })
    }
}

const voterApp = new BlockChain();
console.log(voterApp.genesisBlock());
voterApp.generateNewBlock();
// voterApp.generateNewBlock();
// voterApp.generateNewBlock();
voterApp.displayBlockChain();
// voterApp.checkBlockChainValidity();
// voterApp.blockChain[1].data = 'compromise';
// voterApp.checkBlockChainValidity();
console.log('---------------------------------------');














