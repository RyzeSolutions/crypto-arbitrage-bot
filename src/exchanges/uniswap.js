const { ChainId, Token, Route, Fetcher } = require('@uniswap/sdk')
const tokens = require('../tokens')

module.exports = class Uniswap {
    constructor(provider) {
        this.provider = provider
    }

    token(ticker) {
        return new Token(ChainId.MAINNET, tokens[ticker].address, tokens[ticker].decimals)
    }

    async getRoute(tickerA, tickerB) {
        const tokenA = this.token(tickerA)
        const tokenB = this.token(tickerB)

        const pair = await Fetcher.fetchPairData(tokenA, tokenB, this.provider)
        return new Route([ pair ], tokenB)
    }

    async getPrice(tickerA, tickerB) {
        return (await this.getRoute(tickerA, tickerB)).midPrice
    }
}
