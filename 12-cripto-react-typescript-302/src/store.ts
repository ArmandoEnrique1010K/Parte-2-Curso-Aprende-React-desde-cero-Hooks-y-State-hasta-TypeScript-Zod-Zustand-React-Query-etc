import { create } from 'zustand';
import { Cryptocurrency, CryptoPrice, Pair } from './types';
import { devtools } from 'zustand/middleware';

import { getCryptos, fetchCurrentCryptoPrice } from './services/CryptoServices';


type CryptoStore = {
    cryptocurrencies: Cryptocurrency[]
    // Asigna el type CryptoPrice al state de result
    result: CryptoPrice
    // state de loading
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],

    // Define el state de result, existen 2 formas para establecer su valor inicial

    // Establece un string vacio por cada propiedad
    result: {
        IMAGEURL: '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: '',
    },

    // Trata el objeto como CrytoPrice para que tenga todas esas propiedades inicializadas
    // result: {} as CryptoPrice,

    // Valor inicial de loading (cargando)
    loading: false,

    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    },

    fetchData: async (pair) => {
        // La función set se puede colocar en cualquier parte de la función del state, en este caso, cambia el state de loading a true
        set(() => ({
            loading: true
        }))

        // await fetchCurrentCryptoPrice(pair)

        // Imprime el resultado de la función fetchCurrentCryptoPrice pasando el state de pair
        const result = await fetchCurrentCryptoPrice(pair)
        // console.log(result)

        // Asigna en el state de result el resultado de llamar a la función fetchCurrentCryptoPrice
        set(() => ({
            // result: result
            result,

            // Luego de obtener los datos de cotización se cambia el state de loading a false
            loading: false
        }))

        // Pulsa F12 en Chrome, ve a la pestaña "Redux". Envia el formulario con una moneda y criptomoneda selecciona y observa que en ultimo cambio del state, se establecen los datos de cotización

        // Tambien puedes revisar el state de loading, observa que luego de enviar el formulario, cambia el state a true y luego a false cuando se cargo los datos traidos desde la API

        // Lo bueno de Redux, es que en Chrome, puedes pulsar ir a una acción que se graba (generalmente tiene el nombre "anonymous"), coloca el cursor sobr la acción y haz clic en Jump para ir a ese momento en donde ocurre esa acción, por ejemplo, cuando se muestra el spinner de carga o el state de loading es true
    }
})))


