import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {

    // Para que los calculos sean dinamicos se necesita importar el custom-hook y extraer el state
    const { state } = useBudget()

    // Calculo del prespuesto disponible, utiliza useMemo que dependa de state.expenses

    // Utiliza el metodo reduce en state.expenses para calcular el total de los gastos con expense.amount
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])

    // Para el presupuesto restante se realiza la siguiente operacion
    const remainingBudget = state.budget - totalExpenses

    // Puedes probar las demás funciones y ve que el prespuesto se actualiza, pero todavia no se puede evitar crear o editar un gasto que sobrepase el presupuesto inicial (se puede tener un valor negativo en el presupuesto disponible)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <img src="/grafico.jpg" alt="Grafica de gastos" />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label="Prespuesto"
                    // Para mostrar el presupuesto se coloca lo siguiente
                    // amount={300}
                    amount={state.budget}
                />
                <AmountDisplay
                    label="Disponible"
                    // Muestra el presupuesto restante
                    // amount={200}
                    amount={remainingBudget}
                />
                <AmountDisplay
                    label="Gastado"
                    // Muestra el gasto total
                    // amount={100}
                    amount={totalExpenses}
                />

            </div>
        </div>
    )
}
