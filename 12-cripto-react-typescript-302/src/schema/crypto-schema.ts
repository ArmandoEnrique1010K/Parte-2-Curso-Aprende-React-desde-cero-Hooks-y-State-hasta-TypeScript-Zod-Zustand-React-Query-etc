import { z } from 'zod';

export const CurrencySchema = z.object({
    code: z.string(),
    name: z.string(),
})

export const CryptoCurrencyResponseSchema = z.object({
    CoinInfo: z.object({
        FullName: z.string(),
        Name: z.string()
    })
})

export const CryptoCurrenciesResponseSchema = z.array(CryptoCurrencyResponseSchema)

export const PairSchema = z.object({
    currency: z.string(),
    cryptocurrency: z.string()
})

// Define un nuevo esquema para la respuesta de los datos de cotización de la API
export const CryptoPriceSchema = z.object({
    // Se requiere solamente las propiedades necesarias
    IMAGEURL: z.string(), // URL de la imagen
    PRICE: z.string(), // El precio de cotización (es un string porque tiene el simbolo de la moneda)
    HIGHDAY: z.string(), // El precio más alto durante el dia
    LOWDAY: z.string(), // El precio más bajo durante el dia
    CHANGEPCT24HOUR: z.string(), // Variación del precio de cotización durante las ultimas 24 horas
    LASTUPDATE: z.string(), // Fecha de la ultima actualización
})
