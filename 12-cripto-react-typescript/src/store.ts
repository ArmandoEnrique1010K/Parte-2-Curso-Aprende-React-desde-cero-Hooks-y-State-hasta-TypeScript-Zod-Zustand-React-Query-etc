import { create } from 'zustand';
import { Cryptocurrency, Pair } from './types';
import { devtools } from 'zustand/middleware';

import { getCryptos, fetchCurrentCryptoPrice } from './services/CryptoServices';


type CryptoStore = {
    cryptocurrencies: Cryptocurrency[]
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],

    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    },

    fetchData: async (pair) => {
        await fetchCurrentCryptoPrice(pair)
    }
})))


