import { useContext } from "react"
import BudgetForm from "./components/BudgetForm"
import { BudgetContext } from "./context/BudgetContext";

function App() {

  // Actualmente se tiene el presupuesto en el formulario y se quiere escribir en el budget-reducer
  // Se tendria que importar useReducer, budgetReducer, initialState, para extraer el estado y el dispatch. Para pasarle el state y/o dispatch a los demás componentes por medio de props.

  // En proyectos complejos, tener un estado global ahorra lineas de codigo

  // CONTEXT API

  // Context API permite tener un estado global en tu app, esto quiere decir que solo se tiene una instancia del state que se puede acceder desde cualquier componente sin pasarlo por diferentes componentes vía props

  // El hook para utilizarlo es useContext

  // Muchas librerias utilizan Context API

  // EJEMPLO

  // Se tiene una aplicación que cuenta con los siguientes componentes: <App/>, <Tienda/> y <Productos/>, si se tiene un state de productos en <App/> se tiene que pasar desde <App/> hacia <Tienda/> y luego desde <Tienda/> hacia <Productos/>

  // Con Context API puedes pasarlo directamente de <App/> hacia <Productos/> o simplemente puedes llamarlo desde productos y funciona correctamente.

  // Lo principal es evitar pasar via props state o dispatch porque se puede instanciar directamente

  // ALTERNATIVAS A CONTEXT API

  // Context API no requiere dependencias pero su boilerplate para configurarlo puede ser algo complejo

  // Otras alternativas son Zustand o Redux Toolkit

  // USO DEL CONTEXT

  // Para utilizar el context y acceder a los states y funciones retornadas por el context, se utiliza el hook useContext, requiere un contex
  const context = useContext(BudgetContext);

  // Imprime en la consola el context y se tendra state y dispatch (todo lo que retorna el Context dentro de la prop value, lo que se consume en los componentes utilizando useContext)
  console.log(context)

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">Planificador de gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        <BudgetForm />
      </div>
    </>
  )
}

export default App
