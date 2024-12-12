import { currencies } from "../data"

/* Componente para el formulario */
export default function CryptoSearchForm() {
    return (
        <form
            className="form"
        >
            <div className="field">
                {/* Campo select para seleccionar una moneda */}
                {/* Las monedas se obtendran de un arreglo estatico */}
                <label htmlFor="currency">Moneda: </label>
                <select
                    name="currency"
                    id="currency"
                >
                    <option value="">-- Seleccione --</option>
                    {
                        // Itera por cada elemento en el arreglo currencies
                        currencies.map(currency => (
                            // La API requiere el codigo de la moneda
                            <option key={currency.code} value={currency.code}>{currency.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="field">
                {/* Campo select para seleccionar una criptomoneda */}
                {/* Las criptomonedas se obtendra de una API publica */}
                <label htmlFor="cryptocurrency">Criptomoneda: </label>
                <select
                    name="cryptocurrency"
                    id="cryptocurrency"
                >
                    <option value="">-- Seleccione --</option>
                </select>
            </div>

            {/* Botón para enviar el formulario */}
            <input type="submit" value="Cotizar" />
        </form>
    )
}
