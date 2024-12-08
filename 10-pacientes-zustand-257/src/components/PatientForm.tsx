import { useForm } from "react-hook-form"
import Error from "./Error";
import { DraftPatient } from "../types";
import { usePatientStore } from "../store";
import { useEffect } from "react";
// Importa toast de react-toastify
import { toast } from "react-toastify"
// No olvidar las hojas de estilos de react-toastify
import "react-toastify/dist/ReactToastify.css"

export default function PatientForm() {

  const addPatient = usePatientStore((state) => state.addPatient)

  const activeId = usePatientStore((state) => state.activeId)

  // Extrae el arreglo patients del store (todos los pacientes)
  const patients = usePatientStore((state) => state.patients)

  // Extrae la función para actualizar un paciente desde el store
  const updatePacient = usePatientStore((state) => state.updatePacient)

  // useForm tiene una función llamada setValue para setear un valor por default al formulario
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<DraftPatient>();

  // Efecto secundario para identificar cuando activeId tenga algo
  useEffect(() => {
    if (activeId) {
      // Filtra en el arreglo de patients el paciente cuyo id coincide con el de activeId
      const activePatient = patients.filter(patient => patient.id === activeId)[0]

      // Pulsa en el botón editar y se imprimira en la consola los datos del paciente
      // console.log(activePatient)

      // Setea el valor de la propiedad name de activePatient en el campo name del formulario
      setValue('name', activePatient.name)
      // Repite el mismo procedimiento con los demas campos
      setValue('caretaker', activePatient.caretaker)
      setValue('date', activePatient.date)
      setValue('email', activePatient.email)
      setValue('symptoms', activePatient.symptoms)

      // Pulsa en el botón editar y los campos se rellenaran con los valores del paciente

    }
  }, [activeId])

  const registerPatient = (data: DraftPatient) => {
    // Si se tiene algo en el activeId, significa que se va a actualizar
    if (activeId) {
      updatePacient(data)

      // Realiza el mismo procedimiento para mostrar un toast de tipo success, en este caso se utiliza un type success
      toast('Paciente Actualizado Correctamente', {
        type: 'success'
      })

    } else {
      // Si no hay algo en activeId, se va a crear uno nuevo
      addPatient(data)
      // Utiliza una función especial de react-tostify llamada toast
      // El primer argumento es el mensaje, además cuenta con su propia hoja de estilos
      // toast('Paciente Registrado Correctamente')

      // Solamente al importar su hoja de estilos, muestra la notificación

      // https://fkhadra.github.io/react-toastify/introduction/
      // Puedes ver la documentación para generar un toast con los estilos aplicados

      // Para un toast de tipo success utiliza la función toast.success
      toast.success('Paciente Registrado Correctamente')
    }

    reset()
  }


  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      {/* Aqui no se muestra el activeId */}
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: 'El nombre del paciente es obligatorio',
            })}
          />

          {errors.name && (
            <Error>
              {errors.name?.message}
            </Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: 'El propietario es obligatorio',
            })}
          />

          {errors.caretaker && (
            <Error>
              {errors.caretaker?.message}
            </Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email No Válido'
              }
            })}
          />

          {errors.email && (
            <Error>
              {errors.email?.message}
            </Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register("date", {
              required: 'La fecha de alta es obligatoria',
            })}

          />

          {errors.date && (
            <Error>
              {errors.date?.message}
            </Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register("symptoms", {
              required: 'Los síntomas son obligatorios',
            })}
          ></textarea>

          {errors.symptoms && (
            <Error>
              {errors.symptoms?.message}
            </Error>
          )}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value='Guardar Paciente'
        />
      </form>
    </div>
  )
}