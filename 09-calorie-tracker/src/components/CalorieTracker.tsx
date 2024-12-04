// Componente para las estadisiticas de las calorias
import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

// Define los types
type CalorieTrackerProps = {
    activities: Activity[]
}

// Especifica el tipo de dato para las props recibidas
export default function CalorieTracker({ activities }: CalorieTrackerProps) {

    // Define los contadores

    // Utiliza un useMemo que dependa de activities para ejecutar el codigo
    // Las calorias consumidas seran las actividades que tengan la categoria 1 (comida)

    // Utiliza reduce para realizar el calculo de las calorias consumidas. Si la categoria de activity es 1, se realiza el calculo, de lo contrario retorna el total. El valor inicial es 0
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

    // Reutiliza el mismo codigo para calcular las calorias quemadas

    // Las calorias quemadas seran las actividades que tengan la categoria 2 (ejercicio)
    const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

    // Diferencial de calorias, utiliza un hook useMemo para realizar el calculo restando las calorias consumidas y quemadas
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities])

    return (
        <>
            {/* Titulo con estilos */}
            <h2 className="text-4xl font-black text-white text-center">Resumen de calorias</h2>

            {/* Se van a tener 3 columnas */}
            <div className="flex flex-col item-center md:flex-row md:justify-between gap-5 mt-10">
                {/* Como los contenedors son similares, se utiliza un nuevo componente para mostrar los calculos */}

                {/* Muestra las calorias consumidas */}
                {/* <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
                    <span className="font-black text-6xl text-orange">                    {caloriesConsumed}
                    </span> Consumidas
                </p> */}

                {/* Pasale las props necesarias al componente CalorieDisplay */}
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                {/* Agrega actividades desde el formulario para observar el calculo, además puedes editar y eliminar actividades para ver el resultado */}

                {/* Reutiliza el codigo para aplicar los estilos */}
                {/* Muestra las calorias quemadas utilizando CalorieDisplay */}
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Ejercicio"
                />

                {/* Muestra la diferencia entre las calorias consumidas y quemadas */}
                <CalorieDisplay
                    calories={netCalories}
                    text="Diferencia"
                />

            </div>

        </>
    )
}
