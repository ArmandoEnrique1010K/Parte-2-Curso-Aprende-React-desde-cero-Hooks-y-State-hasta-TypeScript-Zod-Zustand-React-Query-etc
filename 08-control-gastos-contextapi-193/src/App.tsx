import BudgetForm from "./components/BudgetForm"

function App() {

  return (
    <>
      {/* Contenedor para la cabecera */}
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de gastos</h1>
      </header>

      {/* Contenedor para el formulario */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {/* Renderiza el componente del formulario */}
        <BudgetForm />
      </div>
    </>
  )
}

export default App
