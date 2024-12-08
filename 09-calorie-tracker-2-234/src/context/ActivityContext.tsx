import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activity-reducer";
import { Activity } from "../types";
import { categories } from "../data/categories";

// Este componente representa el contexto

// Se define el type para la prop children
type ActivityProviderProps = {
    children: ReactNode
}
// type para el context, VSCode infiere en el tipo de dato para state y dispatch
type ActivityContextProps = {
    state: ActivityState,
    dispatch: Dispatch<ActivityActions>,
    // Asigna los types para las funciones
    caloriesConsumed: number,
    caloriesBurned: number,
    netCalories: number
    categoryName: (category: Activity["category"]) => string[],
    isEmptyActivities: boolean
}

// Crea el contexto, de tipo ActivityContextProps, se coloca null! para asegurarse de que no sea nulo
export const ActivityContext = createContext<ActivityContextProps>(null!);

// El provider contiene todo los datos que se compartiran (children es de tipo ActivityProviderProps)
export const ActivityProvider = ({ children }: ActivityProviderProps) => {

    // Esto se compartira en el provider, el reducer
    const [state, dispatch] = useReducer(activityReducer, initialState)

    // Traslada aqui las funciones definidas en CalorieTracker y en lugar de activities se utiliza state.activities, para que tome el state del reducer y no el state que se pasa via props
    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities])

    const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities])

    // Traslada aqui las funciones definidas en ActivityList y se repite el mismo procedimiento al reemplazar activities por state.activities
    const categoryName = useMemo(() =>
        // No olvidar importar el type Activity
        (category: Activity['category']) =>
            categories.map(cat => cat.id === category ? cat.name : '')
        , [state.activities])

    // VScode infiere en el type para la función categoryName: (category: Activity["category"]) => string[]

    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])



    return (
        // Retorna un objeto en la prop value
        <ActivityContext.Provider value={{
            state,
            dispatch,
            // Pasa los calculos para utilizarlo en el context
            caloriesConsumed,
            caloriesBurned,
            netCalories,
            categoryName,
            isEmptyActivities
        }}>
            {children}
        </ActivityContext.Provider>
    )
}

// Para que funcione este context, ve al componente main.tsx y envuelvelo todo el componente principal