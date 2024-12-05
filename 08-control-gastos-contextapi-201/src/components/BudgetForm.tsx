import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {

    const [budget, setBudget] = useState(0)

    // Llama al hook personalizado, extrae dispatch
    // useReducer retorna state y dispatch en un arreglo, pero en este caso es un custom hook, retorna un objeto
    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    // Define una función para subir el formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Evita el comportamiento por defecto al enviar el formulario
        e.preventDefault()

        // Mensaje de prueba
        // console.log("Añadir o definir presupuesto")

        // Llama al dispatch, acción para agregar presupuesto y pasale el state budget como payload
        dispatch({
            type: 'add-budget',
            // En el payload requiere un budget de tipo number, el state budget
            // payload: { budget: budget }
            payload: { budget }
        })

        // Abre React Developer Tools, ve al componente BudgetProvider, busca el hook Reducer, se tiene el budget igual a 0; escribe el presupuesto, luego pulsa el botón de definir presupuesto y verás que cambia el valor de budget
    }

    return (
        <form
            className="space-y-5"
            // Llama a la función cuando se suba el formulario
            // Recuerda que VSCode infiere en el tipo de dato
            // onSubmit={e => handleSubmit}
            onSubmit={handleSubmit}

        >
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center ">
                    Definir Presupuesto
                </label>
                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                value="Definir Presupuesto"
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    )
}
