(async() => {
    require('dotenv').config()

    // Imports
    const perf = require('execution-time')()
    const { providers } = require('ethers')
    const Uniswap = require('./src/exchanges/uniswap')

    const provider = new providers.InfuraProvider('homestead', {
        projectId: process.env.INFURA_PROJECT_ID,
        projectSecret: process.env.INFURA_PROJECT_SECRET,
    })
    const uniswap = new Uniswap(provider)
    const logPrice = (message, price) => console.log(message, price.toSignificant(10))

    // Get prices
    perf.start()

    const wethDai = uniswap.getPrice('dai', 'weth')
    const wbtcDai = uniswap.getPrice('dai', 'wbtc')
    const btcEthTrade = uniswap.getTrade({
        from: 'wbtc',
        to: 'weth',
        amount: 1,
    })

    await Promise.all([
        wethDai,
        wbtcDai,
        btcEthTrade,
    ])

    console.log('Response delay:', perf.stop().preciseWords)

    logPrice('weth => dai', await wethDai)
    logPrice('wbtc => dai', await wbtcDai)
    logPrice('Trade: 1 wbtc => weth', (await btcEthTrade).executionPrice)
})()
