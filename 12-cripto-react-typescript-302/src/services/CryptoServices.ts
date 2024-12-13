import axios from "axios";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schema/crypto-schema";
import { Pair } from "../types";

export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';

    const { data: { Data } } = await axios(url)
    const result = CryptoCurrenciesResponseSchema.safeParse(Data)

    if (result.success) {
        return result.data
    }
}

export async function fetchCurrentCryptoPrice(pair: Pair) {
    // Recuerda que la URL a la que se va a realizar el llamado es: https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD,EUR

    // Obtenido de: https://min-api.cryptocompare.com/documentation?key=Price&cat=multipleSymbolsFullPriceEndpoint

    // Define la URL, utiliza Template String porque tiene variables que se van a inyectar dinamicamente, el state de pair (criptomoneda y moneda)

    // console.log(pair)

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptocurrency}&tsyms=${pair.currency}`

    // Desestructura data para obtener solamente los datos de la respuesta con axios
    // const { data } = await axios(url)
    // console.log(data)

    // La data contiene las propiedades "RAW" y "DISPLAY", ambas contienen un objeto que contiene una propiedad que lleva el nombre del codigo de la criptomoneda, que contiene un objeto con una propiedad con el nombre de la moneda y luego tiene una propiedad llamada "PRICE" con el precio de cotización de la moneda (la equivalencia de 1 criptomoneda a moneda)

    // Para acceder a la propiedad DISPLAY, puedes desestructurar esa propiedad
    const { data: { DISPLAY } } = await axios(url)

    // Entra directamente a la propiedad DISPLAY, entra al nombre de la criptomoneda, luego a la moneda y se tiene los datos
    // console.log(DISPLAY)

    // La API tiene la forma de retornar los datos de forma dinamica, en el formulario, establece una criptomoneda y luego una moneda, pulsa cotizar. Repite el mismo procediento 2 veces con una criptomoneda y/o moneda diferente y observa que el nombre de la propiedad del objeto de la respuesta cambia dinamicamente

    // Puedes utilizar sintaxis de corchetes [], en objetos, sirven para acceder a una propiedad cuyo nombre cambia en el tiempo, para acceder a una propiedad de un objeto anidado, repite el mismo procedimiento
    // console.log(DISPLAY[pair.cryptocurrency][pair.currency])

    // Solamanete imprime en la consola los datos de cotización

    // Se van a requerir unas propiedades, se definen esas propiedades en un esquema en crypto-schema

    // Establece el esquema en la data de la respuesta de la API
    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptocurrency][pair.currency])

    // En el caso de que haya un error al definir el esquema, imprimira un success false
    // console.log(result);

    // Primero se revisa si el valor de success es true, no se puede omitir esa condición e imprimir solamente la data
    if (result.success) {
        // Solamente obten los datos de la respuesta de los datos establecidos en el esquema,
        // console.log(result.data)

        // La función devolvera la data
        return result.data
    }

}