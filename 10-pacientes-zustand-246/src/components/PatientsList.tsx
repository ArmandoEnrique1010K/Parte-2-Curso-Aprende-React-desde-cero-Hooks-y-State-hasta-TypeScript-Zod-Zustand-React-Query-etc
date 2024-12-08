import { usePatientStore } from "../store"

export default function PatientsList() {

    // Accede al state de patients en el store usePatientStore
    const patients = usePatientStore(state => state.patients)

    // Si añades un nuevo paciente desde el formulario, se imprimira en la consola los datos del paciente del formulario
    console.log(patients)

    // Ahora se puede el state patients en React Developers Tools dentro de este componente

    return (
        <div>PatientsList</div>
    )
}
