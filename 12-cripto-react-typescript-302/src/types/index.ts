import { z } from 'zod'
import { CryptoCurrenciesResponseSchema, CryptoCurrencyResponseSchema, CryptoPriceSchema, CurrencySchema, PairSchema } from '../schema/crypto-schema'

export type Currency = z.infer<typeof CurrencySchema>

export type Cryptocurrency = z.infer<typeof CryptoCurrencyResponseSchema>

export type Cryptocurrencies = z.infer<typeof CryptoCurrenciesResponseSchema>

export type Pair = z.infer<typeof PairSchema>

// Define un type para CryptoPriceSchema
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>