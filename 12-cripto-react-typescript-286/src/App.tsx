import CryptoSearchForm from "./components/CryptoSearchForm"

function App() {

  return (
    <>
      {/* Componente principal */}
      <div className="container">
        <h1 className="app-title">Cotizador de <span>Criptomonedas</span></h1>

        <div className="content">
          {/* Renderiza CryptoSearchForm */}
          <CryptoSearchForm />
        </div>
      </div>
    </>
  )
}

export default App
