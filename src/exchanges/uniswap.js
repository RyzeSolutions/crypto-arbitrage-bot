const { ChainId, Token, Fetcher, Trade, Route, TokenAmount, TradeType } = require('@uniswap/sdk')
const web3 = require('web3')
const tokens = require('../tokens')

module.exports = class Uniswap {
    constructor(provider) {
        this.provider = provider
    }

    token(ticker) {
        const token = tokens[ticker]

        if (token)
            return new Token(ChainId.MAINNET, token.address, token.decimals)

        throw Error(`Token ${ ticker } not found`)
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

    async getTrade({ to, from, amount }) {
        const toToken = this.token(to)
        const fromToken = this.token(from)
        const convertedAmount = web3.utils.toBN(amount).mul(web3.utils.toBN(10).pow(web3.utils.toBN(fromToken.decimals)))

        const pair = await Fetcher.fetchPairData(toToken, fromToken, this.provider)
        const route = new Route([ pair ], fromToken)

        return new Trade(route, new TokenAmount(fromToken, convertedAmount), TradeType.EXACT_INPUT)
    }
}
