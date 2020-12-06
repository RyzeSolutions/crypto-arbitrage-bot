(async() => {
    require('dotenv').config()

    // Imports
    const perf = require('execution-time')()
    const { providers } = require('ethers')
    const Uniswap = require('./src/exchanges/uniswap')

    // Instances
    const provider = new providers.InfuraProvider('homestead', {
        projectId: process.env.INFURA_PROJECT_ID,
        projectSecret: process.env.INFURA_PROJECT_SECRET,
    })
    const uniswap = new Uniswap(provider)

    // Functions
    const logPrice = (message, price) => console.log(message, price.toSignificant(10))

    // Get prices
    perf.start()

    const wethDai = uniswap.getPrice({
        from: 'weth',
        to: 'dai',
    })
    const wbtcDai = uniswap.getPrice({
        from: 'wbtc',
        to: 'dai',
    })
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
