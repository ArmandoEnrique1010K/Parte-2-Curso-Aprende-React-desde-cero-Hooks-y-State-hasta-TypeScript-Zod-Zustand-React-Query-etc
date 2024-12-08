// Define los types

// Un paciente registrado en el formulario
export type Patient = {
    id: string,
    name: string,
    caretaker: string,
    email: string,
    date: Date,
    symptoms: string
}

// Paciente sin el id, en lugar de copiar y pegar Patient se utiliza un utility type para omitir el id
export type DraftPatient = Omit<Patient, 'id'>