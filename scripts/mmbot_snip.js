const { Web3 } = require('web3')

const WBNB_ADDRESS = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
const WSS_PROVIDER = 'wss://bsc.getblock.io/6953f208-0b17-4726-b990-e898ead7cd70/mainnet/';


function getFactory() {
    var web3 = new Web3();
    web3.setProvider(new web3.providers.WebsocketProvider(WSS_PROVIDER));
    const abiFactory = require('./abi/abifactory.json');
    return new web3.eth.Contract(abiFactory, FACTORY_ADDRESS);
}


async function getPairCreated(fromBlockNumber) {
    console.log("Listening to PairCreated()")
    getFactory().events.PairCreated({fromBlock: (fromBlockNumber || 0),}, eventListener);
}

function eventListener(err, contractEvent) {
    if (err) {
        console.error("ERROR", err);
        return;
    }

    console.log("*********");
    console.log("Catch it!");
    const {
        event,
        returnValues,
        blockNumber,
    } = contractEvent;
    const {
        token0,
        token1,
        pair,
    } = returnValues;
    console.log(`${event}: Pair was created: \nTOKEN0: ${token0} / \nTOKEN1: ${token1} \nPair ADDRESS: ${pair} \n(block #${blockNumber})`);
    counter++;
    console.log(counter, "events were caught during the session")
    console.log("*********");
}

getPairCreated()

/// node mmbot_snip.js