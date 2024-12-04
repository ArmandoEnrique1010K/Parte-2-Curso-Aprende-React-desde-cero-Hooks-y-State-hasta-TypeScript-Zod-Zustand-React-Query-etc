import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"
function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  // Función para verificiar si se puede reiniciar la aplicación (solamente si hay elementos en el state activities)
  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3">
        {/* Alinea el contenido al centro con items-center */}
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de calorias
          </h1>

          {/* Botón para eliminar todas las actividades (similar a reiniciar la aplicación), se aplican estilos de tailwindCss */}
          <button
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            // disabled contiene un valor booleano para deshabilitar el botón
            disabled={!canRestartApp()}
            // "Recuerda que tiene que haber actividades para poder reiniciar la aplicación"

            // Recuerda que los eventos utilizan un callback, una función de flecha, en este caso llama al dispatch con el type restart-app (no toma un payload)
            onClick={() => dispatch({ type: 'restart-app' })}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      {/* Sección para las estadisticas */}
      <section className="bg-gray-800 py-10">
        {/* Elemento div centrado */}
        <div className="max-w-4xl mx-auto">
          {/* Renderiza el componente CalorieTracker, requiere el state de activities. Puedes colocar el cursor en activities para ver su tipo de dato */}
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
