// Componente para una lista de gastos

// En lugar de pasar el state se importa el custom hook
import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    // Extra el state del hook para el gasto
    const { state } = useBudget()

    // Función con useMemo para verificar que no haya un gasto en la lista, depende de state.expenses
    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])

    return (
        <div className="mt-10">
            {/* Muestra un contenido si no hay elementos en la lista */}
            {isEmpty ?
                <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p>
                :
                (
                    <>
                        {/* Si hay elementos muestra la lista */}
                        <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                        {/* Itera sobre state.expenses, retorna un componente ExpenseDetails por cada elemento (gasto) */}
                        {state.expenses.map(expense => (
                            <ExpenseDetail
                                // pasale las props necesarias
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
