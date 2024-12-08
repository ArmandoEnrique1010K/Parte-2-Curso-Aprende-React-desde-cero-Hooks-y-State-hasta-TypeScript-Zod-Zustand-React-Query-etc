import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"
import { usePatientStore } from "../store"
// Importa toast y su propia hoja de estilos
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


type PatientDetailsProps = {
    patient: Patient
}

export default function PatientDetails({ patient }: PatientDetailsProps) {

    const deletePatient = usePatientStore((state) => state.deletePatient)

    const getPatientById = usePatientStore((state) => state.getPatientById)


    // Crea una función aparte para eliminar
    const handleClick = () => {
        deletePatient(patient.id)
        toast('Paciente Eliminado', {
            type: 'error'
        })
    }

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PatientDetailItem label="ID" data={patient.id} />
            <PatientDetailItem label="Nombre" data={patient.name} />
            <PatientDetailItem label="Propietario" data={patient.caretaker} />
            <PatientDetailItem label="Email" data={patient.email} />
            <PatientDetailItem label="Fecha Alta" data={patient.date.toString()} />
            <PatientDetailItem label="Síntomas" data={patient.symptoms} />

            {/* Añade unas clases para el contenedor de botones */}
            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => getPatientById(patient.id)}
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    // Llama a la función handleClick
                    onClick={handleClick}
                >
                    Eliminar
                </button>

            </div>
        </div>
    )
}
