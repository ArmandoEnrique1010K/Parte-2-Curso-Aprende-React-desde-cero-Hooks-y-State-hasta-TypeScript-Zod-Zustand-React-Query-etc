import { z } from 'zod'
import { CurrencySchema } from '../schema/crypto-schema'

// Exporta el type Currency, utiliza z.infer para que pueda inferir en el type de CurrencySchema
export type Currency = z.infer<typeof CurrencySchema>