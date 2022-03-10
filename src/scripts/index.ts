import ethScript from '@services/ethService'
import coinBaseService from '@services/coinbaseService'
import { batchData } from '@services/firestoreService'

export const uniswapSync = async () => {
    try {
        console.log('----> Uniswap Sync Init')
        const pricesUniswap = await ethScript.getPrices()
        await batchData<AssetPrice>('uniswap', pricesUniswap, 'pairName')
        console.log('Uniswap Sync Finish <----')
    } catch (error) {
        console.log(error)
        console.log('Uniswap Sync Error <----')
    }
}

export const coinbaseSync = async () => {
    try {
        console.log('----> coinbase Sync Init')
        const pricesCoinbase = await coinBaseService.getPrices()
        await batchData<AssetPrice>('coinbase', pricesCoinbase, 'pairName')
        console.log('coinbase Sync Finish <----')
    } catch (error) {
        console.log('coinbase Sync Error <----')
    }
}

type AssetPrice = {
    pairName: string
    base: string
    currency: string
    price: string
}

export default {
    coinbaseSync,
    uniswapSync
}