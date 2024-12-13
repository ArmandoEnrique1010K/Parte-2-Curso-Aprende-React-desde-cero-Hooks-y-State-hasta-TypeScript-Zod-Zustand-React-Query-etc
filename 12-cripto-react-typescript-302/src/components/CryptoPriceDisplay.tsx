import { useMemo } from "react"
import { useCryptoStore } from "../store"
import Spinner from "./Spinner"

// Componente para los datos de cotización de la criptomoneda
export default function CryptoPriceDisplay() {

    // Obten el state de result de store useCryptoStore
    const result = useCryptoStore((state) => state.result)

    // State de loading
    const loading = useCryptoStore((state) => state.loading)

    // Se niega la condición de que al menos una propiedad del objeto result (obtenido del state) tenga un string vacio
    const hasResult = useMemo(() => !Object.values(result).includes(''), [result])

    // Imprime la URL de la imagen obtenida, no viene la URL completa, se requiere contenar la URL del dominio web
    // console.log(result.IMAGEURL)

    // Posible resultado: /media/37746338/usdt.png

    return (


        <div className="result-wrapper">

            {/* Si loading es true, muestra el spinner, de lo contrario, solamente va a mostrar los datos de la cotización si hasResult retorna true */}
            {loading ? <Spinner /> : hasResult && (
                <>
                    <h2>Cotización</h2>
                    <div className="result">
                        {/* Asigna la URL de la imagen de la siguiente forma */}
                        <img
                            src={`https://cryptocompare.com/${result.IMAGEURL}`}
                            alt="Imagen Cryptomoneda" />
                        <div>
                            <p>El precio es de: <span>{result.PRICE}</span></p>
                            <p>Precio más alto del día: <span>{result.HIGHDAY}</span></p>
                            <p>Precio más bajo del día: <span>{result.LOWDAY}</span></p>
                            <p>Variación últimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Última actualización: <span>{result.LASTUPDATE}</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
