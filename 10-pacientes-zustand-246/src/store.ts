// Importa la función create de zustand
import { create } from 'zustand'
// Importa UUID
import { v4 as uuidv4 } from 'uuid'
import { DraftPatient, Patient } from './types'

// type para el state
type PatientState = {
    // Type para un arreglo que es de tipo Patient (cada elemento)
    patients: Patient[]
    // Type para la función de agregar un paciente
    addPatient: (data: DraftPatient) => void

}

// Instala la dependencia de UUID con "npm i uuid" y "npm i --save-dev @types/uuid"
// Luego crea una función para crear un paciente junto con su id generado de forma automatica
const createPatient = (patient: DraftPatient): Patient => {
    return {
        // Devuelve una copia de patient y el id se genera llamando uuidv4
        ...patient,
        id: uuidv4()
    }
}


// Archivo para crear el store de zustand

// El hook se llamara usePatientStore
// En la función create se pasa el type, dentro de ella va un callback, una función de flecha que contiene un objeto

// Para escribir en una de las funciones, pasa las funciones set (para setear o agregar un valor al state) y get (obtener un valor del state) como parametros en la función que contiene create
export const usePatientStore = create<PatientState>((set) => ({
    // Aqui se coloca el state y las funciones que lo modifican
    patients: [],
    // Para que patients no sea del tipo never, se coloca el type en la función create

    // Define la función addPatient
    addPatient: (data) => {
        // Realiza una prueba añadiendo un paciente desde el formulario y se imprime en la consola
        // console.log(data)

        // Crea una constante para almacenar el nuevo paciente
        const newPatient = createPatient(data)

        // Llama a la función set (pasa state como argumento para recuperar el state), como argumento utiliza una función de flecha
        set((state) => ({
            // Puedes escribir en el state, similar al return en useReducer
            patients: [
                // Toma una copia del arreglo patiens del state para no perder los pacientes almacenados
                ...state.patients,
                // Se pasa data, pero marca un error porque data es un type Draft, falta generar su id. Es por ello que se pasa newPatient
                newPatient
            ]
        }))
    }

}))

// Esto es todo para tener un store, a diferencia de contextAPI, se registraba el context y provider, con zustand no se necesita hacer eso ni con un custom hook ni con un reducer para definir las acciones

// En React Developer Tools no se puede ver el store