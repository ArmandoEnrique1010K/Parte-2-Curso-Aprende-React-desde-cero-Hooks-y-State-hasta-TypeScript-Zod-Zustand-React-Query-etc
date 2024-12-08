import { useForm } from "react-hook-form"
import Error from "./Error";
import { DraftPatient } from "../types";
import { usePatientStore } from "../store";

export default function PatientForm() {

  // Llama al store, para extraer el state y funciones puedes desestructurar las funciones de usePatientStore 
  // const { addPatient } = usePatientStore();

  // Otra forma es utilizar una función de flecha para llamar a una función definida en el store
  const addPatient = usePatientStore((state) => state.addPatient)

  const { register, handleSubmit, formState: { errors } } = useForm<DraftPatient>();

  // Aqui se obtiene los datos que el usuario ha ingresado en el formulario
  const registerPatient = (data: DraftPatient) => {
    // Observa la consola y se tiene un objeto que contiene los nombres de los campos y el valor escrito
    // console.log(data)

    // Se necesita establecer un type para el parametro data
    // Recuerda que el type any no sirve

    // Cuando se registra el formulario tiene un data con el type DraftPatient, pero cuando se hace un registerPatient se tiene registerPatient con el data, para solucionarlo es especificar un generic en el useForm, con DraftPatient, cuando se genera y registra al paciente, tendran el mismo type

    // Para agregar un paciente con zustand, se manda a llamar a la función definida en el store
    addPatient(data)
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        // Marca un error porque los parametros data y data no son compatibles,
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
              {/* Como se tiene un type de tipo string  se puede eliminar el metodo toString(). Repite el mismo procedimiento en los demas campos */}
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