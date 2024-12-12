// Instala Zod con el comando "npm i zod"

// Importa la función z
import { z } from 'zod';

// Define el esquema (schema) con Zod
export const CurrencySchema = z.object({
    code: z.string(),
    name: z.string(),
})