import { z } from 'zod'
import { CryptoCurrenciesResponseSchema, CryptoCurrencyResponseSchema, CurrencySchema } from '../schema/crypto-schema'

export type Currency = z.infer<typeof CurrencySchema>

// Define el type para cada criptomoneda, infiere en el type de CryptoCurrencyResponseSchema
export type Cryptocurrency = z.infer<typeof CryptoCurrencyResponseSchema>

// Type para el arreglo de criptomonedas
export type Cryptocurrencies = z.infer<typeof CryptoCurrenciesResponseSchema>