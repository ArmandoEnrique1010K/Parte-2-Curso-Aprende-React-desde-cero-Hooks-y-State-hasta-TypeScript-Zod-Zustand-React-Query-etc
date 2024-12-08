import PatientForm from "./components/PatientForm"
import PatientsList from "./components/PatientsList"

function App() {

  return (
    <>
      <div className="container mx-auto mt-20">
        {/* wd:w-2/3 aplica un ancho de 66% cuando la pantalla sea menor que 768px */}
        <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
          Seguimiento de Pacientes {''}
          <span className="text-indigo-700">Veterinaria</span>
        </h1>

        <div className="mt-12 md:flex">
          {/* Renderiza el formulario y la lista */}
          <PatientForm />
          <PatientsList />
        </div>
      </div>
    </>
  )
}

export default App
