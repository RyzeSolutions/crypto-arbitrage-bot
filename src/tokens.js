const Web3 = require('web3')
const checksum = Web3.utils.toChecksumAddress

module.exports = {
    weth: {
        name: 'Wrapped Ether',
        address: checksum('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'),
        decimals: 18,
    },
    wbtc: {
        name: 'Wrapped BTC',
        address: checksum('0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'),
        decimals: 8,
    },
    dai: {
        name: 'Dai Stablecoin',
        address: checksum('0x6b175474e89094c44da98b954eedeac495271d0f'),
        decimals: 18,
    },
}
