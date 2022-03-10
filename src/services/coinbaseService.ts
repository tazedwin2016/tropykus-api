import { Client } from 'coinbase'
import { logos } from '@config/index'

const PAIRS = ['ETH-USD', 'BTC-USD', 'DAI-USD']

const ENDPOINT = 'https://api.coinbase.com/v2/prices/:currency_pair/spot'

const coinbase = new Client({
    apiKey: 'TN7cwSj7XT3LT74e',
    apiSecret: 'zf8fBPSjMQX9TUCzdxxWzgzB6qQijnJ3',
    strictSSL: false
})

const getPriceByPair = (pair: string) => {
    return new Promise((resolve, reject) => {
        coinbase.getSpotPrice({ currencyPair: pair }, (err, price) => {
            if (err) reject(err)
            resolve(price)
            
        })
    })
}

export const getPrices = async () => {
    const prices = await Promise.all(PAIRS.map((pair) => getPriceByPair(pair)))

    return prices.map(({ data: { base, currency, amount } }: any) => ({
        base,
        currency,
        pairName: `${base}_${currency}`,
        price: amount,
        baseLogo: logos[base],
        currencyLogo: logos[currency],
    }))
}

export default {
    getPrices
}