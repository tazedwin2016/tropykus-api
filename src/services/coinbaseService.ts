import { Client } from 'coinbase'
import { logos } from '../config'

const PAIRS = ['ETH-USD', 'BTC-USD', 'DAI-USD']

const coinbase = new Client({
    apiKey: process.env.COINBASE_API_KEY,
    apiSecret: process.env.COINBASE_API_SECRET,
    strictSSL: false,
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