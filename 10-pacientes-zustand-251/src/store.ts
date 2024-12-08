import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { DraftPatient, Patient } from './types'

type PatientState = {
    patients: Patient[]
    // type para el id activo
    activeId: Patient['id']
    addPatient: (data: DraftPatient) => void
    // No olvidar el type para la función eliminar
    deletePatient: (id: Patient['id']) => void
    // Función para obtener un paciente por su id
    getPatientById: (id: Patient['id']) => void
}

const createPatient = (patient: DraftPatient): Patient => {
    return {
        ...patient,
        id: uuidv4()
    }
}

export const usePatientStore = create<PatientState>((set) => ({
    patients: [],
    // Para evitar el error, inicializa el state de activeId
    activeId: '',

    addPatient: (data) => {
        const newPatient = createPatient(data)

        set((state) => ({
            patients: [
                ...state.patients,
                newPatient
            ]
        }))
    },

    // Función para eliminar un paciente
    deletePatient: (id) => {
        // Imprime el id solamente para una prueba
        // console.log(id)

        set((state) => ({
            // Utiliza el metodo filter para eliminar un paciente cuyo id recibido coincide con un paciente que se encuentra en el arreglo patients
            patients: state.patients.filter(patient => patient.id !== id)

            // Recuerda que el operador !== sirve para omitir el elemento coincidente, filter devuelve un nuevo arreglo
        }))
    },

    // Define la función para obtener el id
    getPatientById: (id) => {
        // Imprime el id en la consola (solamente para pruebas)
        console.log(id)

        // Establece el valor de activeId
        set(() => ({
            activeId: id
        }))
    },
}))