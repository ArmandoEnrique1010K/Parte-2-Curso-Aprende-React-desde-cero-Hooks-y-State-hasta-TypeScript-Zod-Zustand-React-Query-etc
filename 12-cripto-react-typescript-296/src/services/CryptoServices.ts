import axios from "axios";
import { CryptoCurrenciesResponseSchema } from "../schema/crypto-schema";
import { Pair } from "../types";

// Archivo para que contenga las peticiones a la API

// Traslada aqui la definición de la función getCryptos desde store.ts y exportala
export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';

    const { data: { Data } } = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(Data)

    if (result.success) {
        // Recuerda que la respuesta queda tipada
        return result.data
    }
}

// CryptoCompare posse una API para cotizar multiples monedas tradicionales, pero tambien puede ser una moneda a la vez, la URL es:

// https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD,EUR

// Retorna información sobre la criptomoneda, esta URL se utilizara


// La siguiente URL muestra solamente el precio de cotización de 2 criptomendas a 2 monedas

// https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR

// Obtenido de:
// https://min-api.cryptocompare.com/documentation?key=Price&cat=multipleSymbolsFullPriceEndpoint


// Función asincrona para interactuar con la API
export async function fetchCurrentCryptoPrice(pair: Pair) {
    // Verifica en la consola que se imprima desde CryptoServices y no desde store.ts
    console.log(pair)
}