import CalorieDisplay from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"

// Se elimina el type porque no recibe props
// type CalorieTrackerProps = {
//     activities: Activity[]
// }

// Este componente no recibe props
export default function CalorieTracker(/*{ activities }: CalorieTrackerProps*/) {

    // Importa el custom hook, extrae state
    // const { state } = useActivity()

    // Si has trasladado las funciones, necesitas extraer las funciones para los calculos y no el state
    const { caloriesConsumed, caloriesBurned, netCalories } = useActivity()

    // Desestructura activities de state para obtener la variable activitites
    // const { activities } = state;

    // Como las funciones se utilizan solamente en este componente, se podrian mantener ahi, pero tambien lo puedes trasladar al context
    // const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

    // const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

    // const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de calorias</h2>

            <div className="flex flex-col item-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Ejercicio"
                />

                <CalorieDisplay
                    calories={netCalories}
                    text="Diferencia"
                />
            </div>
        </>
    )
}
