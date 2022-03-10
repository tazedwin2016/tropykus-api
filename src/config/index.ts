export const logos = {
    ETH: 'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
    DAI: 'https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png',
    COMP: 'https://tokens.1inch.io/0xc00e94cb662c3520282e6f5717214004a7f26888.png',
    BTC: 'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
    USD: 'https://www.seekpng.com/png/detail/7-79869_dollar-png-free-download-dollar-logo.png',
} as Record<string, string>

export const TOKENS = {
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': {
        symbol: 'WETH',
        name: 'Wrapped Ether',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        decimals: 18,
        logoURI:
            'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
    },
    '0x6b175474e89094c44da98b954eedeac495271d0f': {
        symbol: 'DAI',
        name: 'Dai Stablecoin',
        decimals: 18,
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        logoURI:
            'https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png',
        eip2612: true,
    },
    '0xc00e94cb662c3520282e6f5717214004a7f26888': {
        symbol: 'COMP',
        name: 'Compound',
        decimals: 18,
        address: '0xc00e94cb662c3520282e6f5717214004a7f26888',
        logoURI:
            'https://tokens.1inch.io/0xc00e94cb662c3520282e6f5717214004a7f26888.png',
    },
    '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599': {
        symbol: 'WBTC',
        name: 'Wrapped BTC',
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        decimals: 8,
        logoURI:
            'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
    },
} as Record<string, Record<string, any>>


export const pairs = [
    {
        name: 'DAI / ETH',
        poolAddress: '0x60594a405d53811d3bc4766596efd80fd545a270',
    },
    {
        name: 'WBTC / DAI',
        poolAddress: '0xa93eb5b410b651514a18724872306f5ce9928dde',
    },
    {
        name: 'DAI / COMP',
        poolAddress: '0x1d84f218038e78fce2e447623dfc46360d8ab5a4',
    },
]

export const CHAIN_IDS = {
    ETH: 1,
    BSC: 56,
}
