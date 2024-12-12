import { useCryptoStore } from "../store"
import { currencies } from "../data"
import { ChangeEvent, FormEvent, useState } from "react"
import { Pair } from "../types"
import ErrorMessage from "./ErrorMessage"

export default function CryptoSearchForm() {

    // Extrae el state de cryptocurrencies
    const cryptocurrencies = useCryptoStore((state) => state.cryptocurrencies)

    // Llama a la función de fetchData definido en el store
    const fetchData = useCryptoStore((state) => state.fetchData)


    // State para identificar el par de moneda y criptomoneda, asignale el type Pair (esta definido en index.ts)
    const [pair, setPair] = useState<Pair>({
        currency: '',
        cryptocurrency: ''
    })

    // State para el mensaje de error
    const [error, setError] = useState('')

    // Función para manejar el cambio, como unicamente se utiliza elementos <select> se mantiene el type
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {

        // Setea el state de pair
        setPair({
            ...pair,
            // Recuerda la variable computada
            [e.target.name]: e.target.value
        })

        // Abre ReactDevelopersTools, abre el componente CryptoSearchForm y verifica que las propiedades del state pair se actualicen luego de seleccionar una opción en ambos <select>
    }

    // Función para enviar el formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // Evita el envio por defecto
        e.preventDefault()

        // pair es un objeto, con Object.values convierte el objeto a un arreglo y con includes se verifica que al menos uno de los elementos del arreglo contenga un string vacio
        if (Object.values(pair).includes('')) {
            // Solamente se setea el state de error
            setError('Todos los campos son obligatorios')
            return
        }

        // Establece el mensaje de error a un string vacio, cuando el usuario ha enviado el formulario y ha rellenado todos los campos
        setError('')

        // Llama a la función fetchData y pasale el state de pair (moneda y criptomoneda)
        fetchData(pair)
    }

    return (
        <form
            className="form"
            onSubmit={handleSubmit}
        >
            {/* Solamente si hay un error luego de enviar el formulario, mostrara el mensaje de error, pasa el state de error */}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="field">
                <label htmlFor="currency">Moneda: </label>
                <select
                    name="currency"
                    id="currency"
                    // Evento para manejar el cambio, llama a la función
                    onChange={handleChange}
                    // Asigna en el value el state de pair.currency
                    value={pair.currency}
                >
                    <option value="">-- Seleccione --</option>
                    {
                        currencies.map(currency => (
                            <option
                                key={currency.code}
                                value={currency.code}
                            >{currency.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="field">
                <label htmlFor="cryptocurrency">Criptomoneda: </label>
                <select
                    name="cryptocurrency"
                    id="cryptocurrency"
                    // Evento para manejar el cambio, llama a la función
                    onChange={handleChange}
                    // Asigna en el value el state de pair.criptocurrency
                    value={pair.cryptocurrency}
                >
                    <option value="">-- Seleccione --</option>
                    {
                        // Itera en el arreglo de cryptocurrencies para mostrar los datos de cada criptomoneda
                        cryptocurrencies.map(crypto => (
                            // El nombre se encuentra dentro del objeto CoinInfo en la propiedad FullName
                            <option
                                // Añade el key y value (debe ser el codigo de la criptomoneda)
                                key={crypto.CoinInfo.FullName}
                                value={crypto.CoinInfo.Name}
                            >{crypto.CoinInfo.FullName}</option>
                        ))}
                </select>
            </div>

            <input type="submit" value="Cotizar" />
        </form>
    )
}
