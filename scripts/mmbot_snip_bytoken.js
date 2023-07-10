
const ethers = require('ethers');
const { Web3 } = require('web3')

const FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
const WSS_PROVIDER = 'wss://bsc.getblock.io/6953f208-0b17-4726-b990-e898ead7cd70/mainnet/';


function getFactory() {
    var web3 = new Web3();
    web3.setProvider(new web3.providers.WebsocketProvider(WSS_PROVIDER));
    const abiFactory = require('./abi/abifactory.json');
    return new web3.eth.Contract(abiFactory, FACTORY_ADDRESS);
}

const run = async () => {
    await checkLiq('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c','0xf0c4af5be52b52f9512d34c1af88553d25d7b802');
}

let checkLiq = async (baseToken, snipeToken) => {
    const pairAddressx = await getFactory().methods.getPair(baseToken, snipeToken).call(function (err, res) {});
    console.log("pairAddressx: ", pairAddressx);

    if (pairAddressx !== null && pairAddressx !== undefined) {
        if (pairAddressx.toString().indexOf('0x0000000000000') > -1) {
            console.log(`Pair address ${pairAddressx} not detected. Auto restarting bot...`);
            return await run();
        }
    }
}


(
    async function startUp() {
        await run();
        setTimeout(() => {
            process.exit()
        }, 2000);
    }
)();

