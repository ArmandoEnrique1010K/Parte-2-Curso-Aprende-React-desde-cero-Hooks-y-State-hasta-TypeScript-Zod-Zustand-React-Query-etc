import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"
import { usePatientStore } from "../store"

type PatientDetailsProps = {
    patient: Patient
}

// Componente para los detalles del paciente, se especifica el type PatientDetailsProps
export default function PatientDetails({ patient }: PatientDetailsProps) {

    // Llama al store para extraer la función de eliminar un paciente
    const deletePatient = usePatientStore((state) => state.deletePatient)

    // Repite el mismo procedimiento para extraer la función de obtener un paciente por id
    const getPatientById = usePatientStore((state) => state.getPatientById)

    // O puedes desestructurar de forma directa
    // const {deletePatient, getPatientById} = usePatientStore()


    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            {/* Para mostrar cada dato del paciente se llama al componente PatientDetailItem por cada dato */}

            {/* <p className="font-bold mb-3 text-gray-700 uppercase">ID: {''}
                <span className="font-normal normal-case">{patient.id}</span>
            </p> */}

            {/* <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {''}
                <span className="font-normal normal-case">{patient.name}</span>
            </p> */}

            <PatientDetailItem label="ID" data={patient.id} />
            <PatientDetailItem label="Nombre" data={patient.name} />
            <PatientDetailItem label="Propietario" data={patient.caretaker} />
            <PatientDetailItem label="Email" data={patient.email} />

            {/* La fecha (date) espera un tipo string, puedes convertirlo con toString()  */}
            <PatientDetailItem label="Fecha Alta" data={patient.date.toString()} />

            <PatientDetailItem label="Síntomas" data={patient.symptoms} />

            {/* Contenedor para los botones de editar y eliminar */}
            <div className="flex justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    // Llama a la función para obtener el id del paciente a editar
                    onClick={() => getPatientById(patient.id)}
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    // Llama a la función para eliminar en el evento onClick, pasa el id del paciente como argumento
                    onClick={() => deletePatient(patient.id)}
                >
                    Eliminar
                </button>

            </div>
        </div>
    )
}
