// Crea el store de zustand
// Instala zustand con el comando "npm i zustand"

// Se utilizara la API Crypto Compare, se puede cotizar una criptomoneda a una moneda por su codigo

// https://min-api.cryptocompare.com/documentation?key=Toplists&cat=TopTotalMktCapEndpointFull

// Al realizar la petición a la siguiente URL
// https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD
// Se obtendrán las primeras 20 criptomedas que tienen más valor hoy en dia en cuanto a volumen de transacción, como un objeto JSON (un arreglo)

// Puedes ver que contiene un parametro tsym=USD, USD representa el codigo de la moneda a la que se van a cotizar cada criptomoneda en el arreglo

// La lista de criptomonedas se actualiza en automatico

// Tambien puedes optar por crear una carpeta llamada store y almacenar todos los stores

import axios from 'axios';
import { create } from 'zustand';
import { CryptoCurrenciesResponseSchema } from './schema/crypto-schema';
import { Cryptocurrencies, Cryptocurrency } from './types';

// Importa devtools para utilizar Redux en las herramientas de desarrollo de Chrome
import { devtools } from 'zustand/middleware';


// Función asincrona para obtener las criptomonedas
async function getCryptos() {
    // Define la URL para realizar la petición (cambia el limite a 20 criptomonedas en el parametro limit)
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';

    // Instala axios para llamar a la API con el comando "npm i axios"

    // Obten la data de la respuesta
    // const data = await axios(url)

    // Imprime la data para verificar la lista de criptomonedas
    // console.log(data)

    // En el navegador, revisa la propiedad data (es un objeto), tiene una subpropiedad Data, ahi se encuentra la lista de 20 criptomonedas

    // Para visualizar solamente la lista, desestructura la propiedad data de la siguiente manera
    const { data: { Data } } = await axios(url)
    // console.log(Data)

    // El termino await detiene la ejecución lineal del codigo hasta que se obtenga la respuesta

    // Valida la respuesta, safeParse revisa la respuesta
    // const result = CryptoCurrencyResponseSchema.safeParse(Data)

    // Valida con el schema que contiene el arreglo
    const result = CryptoCurrenciesResponseSchema.safeParse(Data)

    // Debe imprimir la propiedad success con el valor true y la data, si imprime false es porque no esta bien definido el schema 
    // console.log(result)

    // Si se tiene la propiedad success en true, retorna la data
    if (result.success) {
        return result.data
    }


    // Expande un elemento (es un objeto), contiene la propiedad FullName para el nombre de la criptomoneda y la propiedad Name con el nombre del codigo de la criptomoneda. Esas 2 propiedades son importantes para el schema de la API en crypto-schema.ts
}

// Define el type
type CryptoStore = {
    // Puedes utilizar el type Cryptocurrency, para cada elemento del arreglo
    cryptocurrencies: Cryptocurrency[]
    // Para utilizar la versión en plural (el type para el arreglo), tambien funciona pero se recomienda utilizar el type anterior
    // cryptocurrencies: Cryptocurrencies

    // Coloca el cursor sobre la definición de la función fetchCryptos para que VSCode infiera en el tipo de dato
    fetchCryptos: () => Promise<void>

}

// Crea el store de zustand, asignale el type CryptoStore 
// export const useCryptoStore = create<CryptoStore>((set) => ({

// Envuelvelo con devtools
export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    // Las acciones son las funciones que se tiene en el store de zustand

    // State para almacenar el arreglo de criptomonedas
    cryptocurrencies: [],

    // Esta función tiene el objetivo de llamar al JSON que se obtiene al realizar una petición a la API

    // Puedes convertirla a una función asincrona
    fetchCryptos: async () => {
        // console.log('Desde FetchCryptos')

        // Llama a la función
        const cryptocurrencies = await getCryptos()
        // console.log(cryptocurrencies)

        // Imprime un "Promise {<pending>}", porque la función getCryptos es asincrona, solamente si se resuelve la promesa, obtendra la respuesta. Coloca un await para esperar a que se resuelva la función getCryptos y no imprima "Promise {<pending>}"

        // Actualiza el state de cryptocurrencies
        set(() => ({
            // cryptocurrencies: cryptocurrencies
            cryptocurrencies
        }))
    }
})))

// No olvidar añadir un parentesis al final del store si estas utilizando devtools

// Pulsa F12 en el navegador, para abrir las herramientas de desarrollo, ve a la pestaña "Redux", y puedes ver que luego de unos milisegundos, selecciona la ultima acción realizada (puede llevar el nombre "anonymous") y observa que se tiene el arreglo de criptomonedas obtenidas desde la API publica