import { useEffect } from "react"
import CryptoSearchForm from "./components/CryptoSearchForm"
import { useCryptoStore } from "./store"

function App() {

  // Llama a la función useCryptoStore
  const fetchCryptos = useCryptoStore((state) => state.fetchCryptos)

  // Dispara este efecto al cargar este componente
  useEffect(() => {
    // Llama a fetchCryptos
    fetchCryptos()
  }, [])

  return (
    <>
      <div className="container">
        <h1 className="app-title">Cotizador de <span>Criptomonedas</span></h1>

        <div className="content">
          <CryptoSearchForm />
        </div>
      </div>
    </>
  )
}

export default App
