import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const { state } = useBudget()

    // Constante para filtrar los gastos por una categoria seleccionada, se utiliza un operador ternario para verificar si hay una categoria seleccionada, de lo contrario muestra todas las categorias con state.expenses
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses

    // Aqui tambien se filtra utilizando filteredExpenses en lugar de state.expenses
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [state.expenses])

    return (
        // Aplica el estilo de sombra
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            {isEmpty ?
                <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p>
                :
                (
                    <>
                        <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>

                        {/* Itera el arreglo generado con filter en la constante filteredExpenses en lugar de state.expenses */}
                        {filteredExpenses.map(expense => (
                            <ExpenseDetail
                                key={expense.id}
                                expense={expense}
                            />
                        ))}
                    </>
                )
            }
        </div>
    )
}
