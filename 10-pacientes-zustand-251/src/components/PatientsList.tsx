import { usePatientStore } from "../store"
import PatientDetails from "./PatientDetails"

export default function PatientsList() {

    // Recuerda que usePatientStore tiene un argumento que es un callback o función de flecha, 
    const patients = usePatientStore(state => state.patients)

    // Puedes iterar con patients

    return (
        // overflow-y-scroll permite dar un scroll hacia abajo solamente para este elemento si es muy grande
        <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
            {/* Primero se verifica que haya elementos en patients */}
            {patients.length ? (
                // <p>Si hay pacientes</p>
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''}
                        <span className="text-indigo-600 font-bold">y Pacientes y Citas</span>
                    </p>

                    {/* Comienza a iterar en el arreglo patients */}
                    {patients.map(patient => (
                        <PatientDetails
                            key={patient.id}
                            // Pasale la prop patient y asignale un type en el componente propio
                            patient={patient}
                        />
                    ))
                    }
                </>
            ) : (
                <>
                    {/* Si no hay, muestra un mensaje de error */}
                    <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando pacientes {''}
                        <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
                    </p>
                </>
            )}
        </div>
    )
}
