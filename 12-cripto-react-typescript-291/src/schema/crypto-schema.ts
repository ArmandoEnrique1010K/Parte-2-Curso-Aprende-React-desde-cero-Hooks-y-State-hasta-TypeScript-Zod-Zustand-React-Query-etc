import { z } from 'zod';

export const CurrencySchema = z.object({
    code: z.string(),
    name: z.string(),
})

// Schema para la respuesta de la API (recuerda que se obtiene un arreglo de objetos)
// export const CryptoCurrencyResponseSchema = z.array(
//     z.object({
//         // Define aqui las propiedades necesarias que se van a requerir del objeto JSON retornado al realizar una petición a la API
//         CoinInfo: z.object({
//             FullName: z.string(),
//             Name: z.string()
//         })
//     })
// )

// Una buena practica es definir 2 schemas, uno en singular (un objeto) y otro en plural (el arreglo)

export const CryptoCurrencyResponseSchema = z.object({
    CoinInfo: z.object({
        FullName: z.string(),
        Name: z.string()
    })
})

// Utiliza el schema de CryptoCurrencyResponseSchema por cada objeto en el arreglo
export const CryptoCurrenciesResponseSchema = z.array(CryptoCurrencyResponseSchema)