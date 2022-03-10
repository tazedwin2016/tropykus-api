import { ethers } from 'ethers'
import { Pool } from '@uniswap/v3-sdk'
import { Token } from '@uniswap/sdk-core'
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { pairs, TOKENS, CHAIN_IDS } from '../config'

const provider = new ethers.providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/f1186d2ccefb4a4bba19eadd91eabfad'
)

interface Immutables {
    factory: string
    token0: string
    token1: string
    fee: number
    tickSpacing: number
    maxLiquidityPerTick: ethers.BigNumber
}

interface State {
    liquidity: ethers.BigNumber
    sqrtPriceX96: ethers.BigNumber
    tick: number
    observationIndex: number
    observationCardinality: number
    observationCardinalityNext: number
    feeProtocol: number
    unlocked: boolean
}

async function getPoolImmutables(poolContract: ethers.Contract) {
    const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
        await Promise.all([
            poolContract.factory(),
            poolContract.token0(),
            poolContract.token1(),
            poolContract.fee(),
            poolContract.tickSpacing(),
            poolContract.maxLiquidityPerTick(),
        ])

    const immutables: Immutables = {
        factory,
        token0,
        token1,
        fee,
        tickSpacing,
        maxLiquidityPerTick,
    }
    return immutables
}

async function getPoolState(poolContract: ethers.Contract) {
    const [liquidity, slot] = await Promise.all([
        poolContract.liquidity(),
        poolContract.slot0(),
    ])

    const PoolState: State = {
        liquidity,
        sqrtPriceX96: slot[0],
        tick: slot[1],
        observationIndex: slot[2],
        observationCardinality: slot[3],
        observationCardinalityNext: slot[4],
        feeProtocol: slot[5],
        unlocked: slot[6],
    }

    return PoolState
}

export const getPrices =  async () => {

    const prices = []
    for (const pair of pairs) {
        const poolContract = new ethers.Contract(
            pair.poolAddress,
            IUniswapV3PoolABI,
            provider
        )
        const [immutables, state] = await Promise.all([
            getPoolImmutables(poolContract),
            getPoolState(poolContract),
        ])

        const TokenA = new Token(
            CHAIN_IDS.ETH,
            immutables.token0,
            TOKENS[immutables.token0.toLocaleLowerCase()].decimals,
            TOKENS[immutables.token0.toLocaleLowerCase()].symbol,
            TOKENS[immutables.token0.toLocaleLowerCase()].name
        )
        const TokenB = new Token(
            CHAIN_IDS.ETH,
            immutables.token1,
            TOKENS[immutables.token1.toLocaleLowerCase()].decimals,
            TOKENS[immutables.token1.toLocaleLowerCase()].symbol,
            TOKENS[immutables.token1.toLocaleLowerCase()].name
        )

        const pool = new Pool(
            TokenA,
            TokenB,
            immutables.fee,
            state.sqrtPriceX96.toString(),
            state.liquidity.toString(),
            state.tick
        )
        
        const [base, currency] = pair.name.split(' / ')

        prices.push({
            base,
            currency,
            pairName: `${base}_${currency}`,
            price: pool.priceOf(pool.token0).toFixed(5),
            baseLogo: TOKENS[TokenA.address.toLocaleLowerCase()].logoURI,
            currencyLogo: TOKENS[TokenB.address.toLocaleLowerCase()].logoURI,
        })
    }

    return prices

}


export default {
    getPrices
}