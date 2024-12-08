import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { DraftPatient, Patient } from './types'

// LOCALSTORAGE CON ZUSTAND

// Importa devtools de zustand
// Puedes importar persistence dentro de zustand/middleware para tener un estado persistence
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

// REDUX DEVTOOLS

// Es una extensión de Google Chrome para ver el estado global de la aplicación

// Puedes instalarlo desde Chrome web Store, antes de abrir las herramientas de desarrollo y pulsar la sección "Redux", debes realizar unos cambios en este archivo


type PatientState = {
    patients: Patient[]
    activeId: Patient['id']
    addPatient: (data: DraftPatient) => void
    deletePatient: (id: Patient['id']) => void
    getPatientById: (id: Patient['id']) => void
    // Función para actualizar un paciente
    updatePacient: (data: DraftPatient) => void
}

const createPatient = (patient: DraftPatient): Patient => {
    return {
        ...patient,
        id: uuidv4()
    }
}

// Concatena el metodo devtools dentro de create y dentro de ella coloca toda la función del store
export const usePatientStore = create<PatientState>()(
    devtools(
        // Utiliza persistence con la función persist, espera 2 argumentos
        persist(
            // Traslada aqui toda la función de flecha para modificar el state
            (set) => ({
                patients: [],
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

                deletePatient: (id) => {
                    set((state) => ({
                        patients: state.patients.filter(patient => patient.id !== id)
                    }))
                },

                getPatientById: (id) => {
                    // console.log(id)

                    set(() => ({
                        activeId: id
                    }))
                },

                updatePacient: (data) => {
                    set((state) => ({
                        // Itera sobre los pacientes con map para encontrar el paciente por el id activo
                        patients: state.patients.map(patient => patient.id === state.activeId
                            ?
                            // El id se puede recuperar de state.activeId o patient.id, luego se toma una copia de data
                            { id: state.activeId, ...data }
                            // Una vez que se edita se almacena en data, todo lo que se pasa desde el formulario
                            :
                            patient),

                        // Con zustand es posible escribir multiples states al mismo tiempo

                        // Regresa a activeId a un string vacio
                        activeId: ''
                    }))
                }
            }),
            // En este objeto se definen las configuraciones del storage
            {
                // Especifica el nombre del key
                name: 'patient-storage',
                // Importa createJSONStorage para pasar en un callback el nombre del tipo de storage
                storage: createJSONStorage(() => localStorage)

                // Puedes ir a la sección application de las herramientas de desarrollo de chrome para ver el storage
            }
        )
    )
)

// En las herramientas de desarrollo de Chrome, ve a la pestaña redux y se tendra el state de patients y activeId. Al resgistrar un paciente nuevo, aparece un nuevo paciente en el state patients y en activeId se mostrara el id al pulsar el botón editar

// La ventaja de redux es que puedes alternar entre los distintos cambios en el state