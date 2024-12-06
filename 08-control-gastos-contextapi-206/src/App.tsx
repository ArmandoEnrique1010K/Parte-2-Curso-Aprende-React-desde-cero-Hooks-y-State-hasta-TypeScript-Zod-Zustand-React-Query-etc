import { useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"

function App() {

  const { state } = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {/* Aqui se renderiza el modal, en el navegador, ese componente retorna un botón de signo más en la parte inferior derecha de la aplicación web */}

      {/* Coloca una condición si se ha escrito un presupuesto valido, muestre el botón. El operador && sirve para un ternario simplificado, solamente si no se tiene nada para una condición que es falsa */}
      {isValidBudget && (
        // Se colocan unas clases para el contenedor del modal
        <main className="max-w-3xl mx-auto py-10">
          {/* Los estilos no van a afectar al modal porque tiene la clase position:fixed */}
          <ExpenseModal />
        </main>
      )}

      {/* Escribe un presupuesto, pulsa el botón "Definir presupuesto" y muestra el botón de signo + */}

    </>
  )
}

export default App
