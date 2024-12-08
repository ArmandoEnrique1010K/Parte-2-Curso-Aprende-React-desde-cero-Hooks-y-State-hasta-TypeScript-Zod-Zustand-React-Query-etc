// Importa useForm de react hook form
import { useForm } from "react-hook-form"
import Error from "./Error";

// Componente para el formulario de un paciente
export default function PatientForm() {

  // LIBRERIAS PARA FORMULARIOS

  // ¿Cuando utilizar una libreria de formularios en React?

  // Si tu proyecto contará con formularios muy grandes, complejos, múltiples formularios o validaciones complejas, una librería solucionará muchos problemas

  // Algunas librerías cuentan con validaciones muy robustas y otras se integran bien con alguna dependencia de validación

  // OPCIONES DISPONIBLES

  // React Hook Form
  // Formik con Yup
  // Utilizar ZOD para validaciones

  // REACT HOOK FORM

  // Instala la libreria de React Hook Form con el comando "npm i react-hook-form"

  // Documentación: https://react-hook-form.com/

  // Se tienen diferentes hooks como useForm que permite crear un formulario

  // Tambien hay una demostración en la documentación al intentar enviar un formulario con campos vacios, se mostrara los errores dentro de un objeto

  // Llama al hook useForm, extrae una función llamada register (incluye otras funciones), permite registrar un <input> o <select> y aplicar reglas de validación de React Hook Form (basadas en reglas HTML)

  // Otra función es handleSubmit, se coloca en el elemento <form> y formState para el estado del formulario, en este ultimo, extrae el objeto errors
  const { register, handleSubmit, /*formState,*/ formState: { errors } } = useForm();

  // Al imprimir formState se obtiene un objeto con varias propiedades y metodos de React Hook Forms, una de sus propiedades es "errors", se necesita extraer eso para ver los errores
  // console.log(formState)

  // Crea una función para registrar el paciente
  const registerPatient = () => {
    // El mensaje solamente se mostrara al escribir un texto en el campo name (porque es obligatorio, especificado con required)
    console.log('Nuevo Paciente')
  }

  // Imprime los mensajes de errores
  console.log(errors)

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        // Esta propiedad evita que valide el formulario
        noValidate
        // Llama a la función handleSubmit de React Hook Form y pasale como argumento la función registerPatient al enviar el formulario
        onSubmit={handleSubmit(registerPatient)}
      >
        {/* Campo para el nombre del paciente */}
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            // Sintaxis para utilizar register, el operador Spread permite tomar una copia de la función y pasarla via props a este elemento <input>.

            // Utiliza un nombre unico (el mismo valor que el id) para recuperar los datos que el usuario ha ingresado y un objeto para validaciones
            {...register("name", {
              // Con required se hace una validación, el campo es obligatorio
              required: 'El nombre del paciente es obligatorio',
              // Otra propiedad es maxLength para el maximo de caracteres, lleve las propieades value y message
              // maxLength: {
              //   value: 8,
              //   message: 'Maximo 8 caracteres'
              // }
            })}
          />

          {/* Renderiza el componente Error solamente si hay un error, aplica sintaxis de componente para pasarle el mensaje de error por dentro */}
          {errors.name && (
            <Error>
              {
                // Los errores vienen en un objeto, anida la propiedad name (concatena un optional chaining porque el error es opcional) y luego message (el mensaje de error)
                // errors.name?.message

                // Como pueder undefined el mensaje, puedes colocarle as string para que se castre a un string
                // errors.name?.message as string

                // O utilizar el metodo toString()
                errors.name?.message?.toString()

                // Muestra el mensaje de error al enviar el formulario con este campo vacio
              }
            </Error>
          )}

          {/* Para mostrar el mensaje de error del maximo de caracteres, se repite el mismo procedimiento */}
          {/* {errors.maxLength && (
            <Error>
              {errors.maxLength?.message?.toString()}
            </Error>
          )} */}

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
            // Aplica la validación para el campo caretaker (propietario de la mascota)
            {...register("caretaker", {
              required: 'El propietario es obligatorio',
            })}
          />

          {/* Muestra el mensaje de error en el campo caretaker */}
          {errors.caretaker && (
            <Error>
              {errors.caretaker?.message?.toString()}
            </Error>
          )}

          {/* De esa manera se muestran los errores en los campos establecidos */}

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
            // Aplica la validación para el campo email (correo)
            {...register("email", {
              required: "El Email es Obligatorio",
              // pattern sirve para especificar un patrón de caracteres o expresión regular (es complejo escribir eso) en este caso es para un email valido

              // Posible valor: ejemplo123@correo.com
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email No Válido'
              }
            })}
          />

          {/* Muestra el mensaje de error en el campo email */}
          {errors.email && (
            <Error>
              {errors.email?.message?.toString()}
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
            // Aplica la validación para el campo date (fecha de alta)
            {...register("date", {
              required: 'La fecha de alta es obligatoria',
            })}

          />

          {/* Muestra el mensaje de error en el campo date */}
          {errors.date && (
            <Error>
              {errors.date?.message?.toString()}
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
            // Aplica la validación para el campo symptoms (sintomas)
            {...register("symptoms", {
              required: 'Los síntomas son obligatorios',
            })}

          ></textarea>
          {/* El elemento <textarea></textarea> se puede cerrar de la siguiente forma: <textarea/> */}

          {/* Muestra el mensaje de error en el campo symptoms */}
          {errors.symptoms && (
            <Error>
              {errors.symptoms?.message?.toString()}
            </Error>
          )}
        </div>

        {/* En conclusión react hook form simplifica la validación de campos como las del email y tiene una sintaxis sencilla y clara */}

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value='Guardar Paciente'
        />
      </form>
    </div>
  )
}