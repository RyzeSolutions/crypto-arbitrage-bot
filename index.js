require('dotenv').config()

const { providers } = require('ethers')
const Uniswap = require('./src/exchanges/uniswap')

const provider = new providers.InfuraProvider('homestead', {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
})
const uniswap = new Uniswap(provider);

(async() => {
    console.log('dai => weth:', (await uniswap.getPrice('dai', 'weth')).toSignificant(10))
    console.log('dai => wbtc:', (await uniswap.getPrice('dai', 'wbtc')).toSignificant(10))
})()
