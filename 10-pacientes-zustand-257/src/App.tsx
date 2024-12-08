import PatientForm from "./components/PatientForm"
import PatientsList from "./components/PatientsList"
// Importa ToastContainer de React Toastify, es el componente para mostrar un Toast
import { ToastContainer } from "react-toastify"

function App() {

  // REACT TOASTIFY

  // Sirve para mostrar una notificación

  // Instalala con el comando "npm i react-toastify"

  // https://www.npmjs.com/package/react-toastify

  // Se agrega en 2 lugares: App.tsx (espera a que se llame el evento) y en las funciones en donde se dispararan

  // https://fkhadra.github.io/react-toastify/introduction/

  return (
    <>
      <div className="container mx-auto mt-20">
        <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
          Seguimiento de Pacientes {''}
          <span className="text-indigo-700">Veterinaria</span>
        </h1>

        <div className="mt-12 md:flex">
          <PatientForm />
          <PatientsList />
        </div>
      </div>

      {/* Renderiza el componente ToastContainer */}
      <ToastContainer />
    </>
  )
}

export default App
