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

    async getRoute({ fromToken, toToken }) {
        const pair = await Fetcher.fetchPairData(toToken, fromToken, this.provider)

        return new Route([ pair ], fromToken)
    }

    async getPrice({ from, to }) {
        const fromToken = this.token(from)
        const toToken = this.token(to)

        return (await this.getRoute({ fromToken, toToken })).midPrice
    }

    async getTrade({ from, to, amount }) {
        const toToken = this.token(to)
        const fromToken = this.token(from)

        const route = await this.getRoute({ fromToken, toToken })
        const convertedAmount = web3.utils.toBN(amount).mul(web3.utils.toBN(10).pow(web3.utils.toBN(fromToken.decimals)))

        return new Trade(route, new TokenAmount(fromToken, convertedAmount), TradeType.EXACT_INPUT)
    }
}
