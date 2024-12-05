import { useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"

function App() {

  // Se utilizo useContext para acceder al contenido del provider, pero para evitar llamar a useContext cada vez que se va a utilizar el contexto, se puede trasladar hacia un hook personalizado
  // const context = useContext(BudgetContext);
  // console.log(context)

  // Llama al hook personalizado useBudget, como devuelve el context se puede desestructurar para obtener los values definidos en el context 
  // const context = useBudget();
  // const { state, dispatch } = useBudget()

  // Si intentas agregar una nueva propiedad en el state de budgetReducer, se imprimira en la consola (budget-reducer)
  // console.log(context.state)
  // console.log(state)

  // En este caso se requiere acceder al state de useBudget
  const { state } = useBudget()
  // console.log(state.budget)

  // Recuerda que para escribir en el state se tiene acceso a un dispatch

  // Función para validar el presupuesto (debe ser mayor que 0) con useMemo
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {/* Renderiza el componente BudgetTracker si el presupuesto es valido, de lo contrario mantiene el formulario */}
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}

      </div>
    </>
  )
}

export default App
