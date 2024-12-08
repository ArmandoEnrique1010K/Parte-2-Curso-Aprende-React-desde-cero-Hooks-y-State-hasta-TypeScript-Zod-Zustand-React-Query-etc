import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
// No olvidar la hoja de estilos para react-circular-progressbar
import "react-circular-progressbar/dist/styles.css"

export default function BudgetTracker() {

    // Estas 3 lineas de codigo se tendran que mover hacia el formulario, porque ahi se tiene la cantidad disponible, en lugar de llevalo hacia ExpenseForm, se tendria que llevar hacia el context
    // const { state } = useBudget()

    // const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])

    // const remainingBudget = state.budget - totalExpenses

    // Llama al custom hook extrayendo las propiedades respectivas
    const { state, totalExpenses, remainingBudget, dispatch } = useBudget()

    // Existe una dependencia para crear graficas circulares, instalala con el comando "npm i react-circular-progressbar"

    // CircularProgressbar y buildStyles son 2 componentes para las graficas circulares

    // Crea una variable para calcular el porcentaje (no olvidar el operador unario + para convertirlo a numero)
    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

    // Al imprimirlo en la consola el resultado puede contener más de 2 decimales, para limitar la cantidad de decimales se utiliza el metodo toFixed(2) para limitar a 2 decimales como maximo
    console.log(percentage)

    // Posible valor: 28.57

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                {/* <img src="/grafico.jpg" alt="Grafica de gastos" /> */}

                {/* En lugar de una imagen estatica se utiliza una grafica con el componente CircularProgressbar se genera la grafica */}
                <CircularProgressbar
                    // Prop value sirve para indicar que es lo que se va a graficar (puede tener un valor de 0 a 100)
                    value={percentage}
                    // Prop styles, define los estilos para la grafica
                    styles={buildStyles({
                        // color de la grafica (aplica el color a la parte que ha sido tomada por el value), puedes utilizar un operador ternario para asignar un color diferente cuando no haya un presupuesto disponible
                        pathColor: percentage === 100 ? '#DC2626' : '#3B82F6',
                        // color para la parte que no ha sido tomada
                        trailColor: '#F5F5F5',
                        // tamaño del texto
                        textSize: 8,
                        // color del texto
                        textColor: percentage === 100 ? '#DC2626' : '#3B82F6',
                    })}
                    // text sirve para colocar un texto al centro de la grafica
                    text={`${percentage}% Gastado`}
                >

                </CircularProgressbar>
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                    // Añade un evento onClick para reiniciar la aplicación
                    onClick={() => dispatch({
                        type: 'reset-app'
                    })}
                >
                    Resetear App
                </button>

                <AmountDisplay
                    label="Prespuesto"
                    amount={state.budget}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={remainingBudget}
                />
                <AmountDisplay
                    label="Gastado"
                    amount={totalExpenses}
                />

            </div>
        </div>
    )
}
