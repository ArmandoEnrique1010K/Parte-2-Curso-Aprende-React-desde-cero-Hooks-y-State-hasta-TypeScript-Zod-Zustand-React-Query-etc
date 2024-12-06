import { ChangeEvent, FormEvent, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

// Traslada los types a la carpeta types, archivo index.ts
// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];


export default function ExpenseForm() {

    // Maneja un estado local para un gasto con useState, se asigna el type DraftExpense porque no tiene un id
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        // El valor inicial de date es un constructor Date, que almacena la fecha y hora actual
        date: new Date()
    })

    // Estado para un mensaje de error
    const [error, setError] = useState('')

    // Llama al hook useBudget para escribir en el state (recuerda que el context evita estar pasando entre componente las props)
    const { dispatch } = useBudget();

    // Función para manejar los cambios en los campos, asigna el type en el parametro para los campos del formulario asociado: <input> y <select> 
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        // Recuerda que en el type la cantidad tiene que ser un numero, se puede tener una condición que revise si es un numero

        // e.target hace referencia al elemento del formulario, incluye todos sus atributos como name y value
        const { name, value } = e.target

        // No se puede desestructurar nameAsValue porque los elementos <select> no soportan ese atributo

        // Retorna false si el valor de name no es "amount"
        const isAmountField = ['amount'].includes(name)

        // Verifica el resultado escribiendo en los campos del formulario
        // console.log(isAmountField)

        // Setea el state expense
        setExpense({
            ...expense,
            // Variable computarizada (busca el elemento por el valor del atributo name y escribe el valor ingresado), convierte el valor a un number si se trata del 'campo' amount del formulario
            [name]: isAmountField ? +value : value

            // Otra forma
            // [name]: isAmountField? Number(value): value
        })
    }

    // Función para cambiar la fecha (no olvidar asignar el type Value al parametro)
    const handleChangeDate = (value: Value) => {
        // Imprime el valor
        // console.log(value)

        // Setea el state de expense para cambiar la fecha
        setExpense({
            ...expense,
            date: value
        })

        // Abre React Developer Tools, cambia la fecha y observa que el state expense se actualiza la fecha
    }

    // Función para subir el formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // Evita el comportamiento por defecto
        e.preventDefault()

        // Validación si al menos uno de los valores de las propiedades del objeto expense incluye un String vacio

        // Object.values convierte un objeto a arreglo
        if (Object.values(expense).includes('')) {
            // console.log('error...')

            // Setea el mensaje de error
            setError('Todos los campos son obligatorios')

            // Coloca un return para detener la ejecución de la función si no pasa la validación
            return
        }

        // console.log("Todo bien...")

        // Llama a la acción para agregar un nuevo gasto, pasa como payload el gasto (expense: expense)
        dispatch({
            type: 'add-expense',
            payload: { expense }
        })

        // En React Developer Tools, abre el componente BudgetProvider, observa el reducer, el state de expenses luego de guardar un nuevo gasto desde el formulario, lo agrega al state (arreglo expenses)

        // Luego de activar el dispatch se tiene que reiniciar el state de expense a su valores iniciales
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })

        // Recuerda que en la acción de "add-expense" la ventana modal se cierra porque tiene la propiedad "modal: false" luego de agregar un nuevo gasto
    }

    return (
        <form
            className="space-y-5"
            // Añade el evento onSubmit para subir el formulario
            // Infiere en el tipo de dato de e: React.FormEvent<HTMLFormElement>
            // onSubmit={e => }
            onSubmit={handleSubmit}
        >

            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                Nuevo Gasto
            </legend>

            {/* Si hay un error, renderiza el componente que contiene el mensaje de error, pasa por prop el mensaje de error */}
            {/* {error && <ErrorMessage error={error} />} */}

            {/* Puedes utilizar una sintaxis diferente para mostrar el mensaje */}
            {/* {error} hace referencia a los elementos hijos */}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {/* Para ver el mensaje de error pulsa el botón "Registrar gasto" sin haber introducido texto en algun campo del formulario */}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >
                    Nombre Gasto:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    // Asigna en el value el valor inicial de cada una de las propiedades del objeto inicial del state
                    value={expense.expenseName}
                    // Recuerda que VSCode infiere en el tipo de dato del parametro e
                    // React.ChangeEvent<HTMLInputElement>
                    // onChange={e => }
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >
                    Cantidad:
                </label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    // El valor inicial
                    value={expense.amount}
                    // El evento onChange
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"
                >
                    Categoría:
                </label>
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    // Para la categoria, se define el value en el elemento <select>
                    value={expense.category}
                    // onChange={e => }
                    // En este caso infiere en el tipo de dato ChangeEvent<HTMLSelectElement>
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>

                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >
                    Fecha Gasto:
                </label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    // En el caso de DatePicker, acepta una prop llamada value para que contenga el valor inicial (la fecha actual)
                    value={expense.date}
                    // Conecta el state con cada uno de los campos

                    // Tambien tiene una prop onChange similar al evento onChange
                    onChange={handleChangeDate}
                // Puedes utilizar React Developer Tools, componente ExpenseForm para ver el state de expense, como hay varios componentes debido a headless Ui, puedes buscar el componente por su nombre
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={'Registrar gasto'}
            />
        </form>
    )
}
