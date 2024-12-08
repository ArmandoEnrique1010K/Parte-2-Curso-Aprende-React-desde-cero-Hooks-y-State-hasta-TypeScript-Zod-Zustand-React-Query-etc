import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')

    // Tambien obten el state de useBudget
    const { dispatch, state } = useBudget();

    // Efecto secundario que depende de state.editingId porque se esta editando
    useEffect(() => {
        // Verifica que haya algo en el state editingId
        if (state.editingId) {
            // Busca el gasto del estado expense con el metodo filter, debe coincidir con el id que se envia, recuerda que filter retorna un arreglo y se coloca [0] para obtener el primer elemento
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]

            // Establece en el state de expense los datos del gasto que viene de editingExpense
            setExpense(editingExpense);

            // Para evitar crear un gasto nuevo cada vez que se edita un gasto
        }

    }, [state.editingId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target

        const isAmountField = ['amount'].includes(name)

        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }

        // Solamente si hay un id en el state de editingId se ejecutara la acción de editar el gasto
        if (state.editingId) {
            dispatch({
                type: 'update-expense',
                // En el payload requiere un id y una copia de las propiedades del state expense
                payload: { expense: { id: state.editingId, ...expense } }
            })
        } else {
            // Caso contrario, se agregara un nuevo gasto
            dispatch({
                type: 'add-expense',
                payload: { expense }
            })
        }

        // Ahora puedes arrastrar un gasto hacia la derecha y lo puedes editar desde el formulario de la ventana modal

        // Pero al pulsar el botón de agregar, los datos se mantiene en el formulario, por lo cual se realiza una correción en budget-reducer

        // Tambien al cerrar la ventana modal de editar y luego clic en el botón de agregar, aun se mantienen los datos del gasto que se va a editar. Para aquello realiza un cambio en la acción de "close-modal" en budget-reducer

        // Ahora si puedes abrir la ventana modal para editar un gasto, cierra la ventana y luego al hacer clic en el botón de agregar un nuevo gasto, el formulario se mostrara vacio (inicia desde 0)

        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
    }

    return (
        <form
            className="space-y-5"
            onSubmit={handleSubmit}
        >

            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {/* Muestra un texto diferente si se esta editando (si el state.editingId tiene un valor) */}
                {state.editingId ? "Guardar Cambios" : "Nuevo Gasto"}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

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
                    value={expense.expenseName}
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
                    value={expense.amount}
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
                    value={expense.category}
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
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                // Muestra un texto diferente en el atributo value si se esta editando (si el state.editingId tiene un valor)
                value={state.editingId ? "Guardar Cambios" : "Nuevo Gasto"}
            // De esa forma se mostrar un texto diferente al querer agregar o editar un gasto existente
            />
        </form>
    )
}
