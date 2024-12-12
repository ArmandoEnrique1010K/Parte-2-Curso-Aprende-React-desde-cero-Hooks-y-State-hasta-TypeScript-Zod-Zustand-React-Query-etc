import { create } from 'zustand';
import { Cryptocurrency, Pair } from './types';
import { devtools } from 'zustand/middleware';

// Importa getCryptos y fetchCurrentCryptoPrice de la carpeta services
import { getCryptos, fetchCurrentCryptoPrice } from './services/CryptoServices';


type CryptoStore = {
    cryptocurrencies: Cryptocurrency[]
    fetchCryptos: () => Promise<void>
    // No olvidar el type
    fetchData: (pair: Pair) => Promise<void>
}

// Recuerda que en Zustand se escribe unicamente lo que se va a requerir en diferentes componentes para evitar pasarlo a props
export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],

    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    },

    // Función asincrona para el llamado a la API, se requiere la moneda y la criptomoneda
    fetchData: async (pair) => {
        // Imprime el argumento pair (el par de moneda y criptomoneda que se pasa desde el formulario)
        // console.log(pair);

        // Llama a la función asincrona fetchCurrentCryptoPrice y pasale pair, utiliza el termino await en la función
        await fetchCurrentCryptoPrice(pair)
    }
})))


