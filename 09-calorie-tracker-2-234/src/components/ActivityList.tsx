import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useActivity } from "../hooks/useActivity"

// type ActivityListProps = {
//     activities: Activity[]
//     dispatch: Dispatch<ActivityActions>
// }

// Recuerda que no se reciben props ni se tiene un type para las props
export default function ActivityList(/*{ activities, dispatch }: ActivityListProps*/) {

    // Llama al custom hook y extrae state y dispatch
    // const { state, dispatch } = useActivity();

    // Desestructura activitites de state para utilizar 
    // const { activities } = state

    // Puedes trasladar las siguientes 2 funciones al context
    // const categoryName = useMemo(() =>
    //     (category: Activity['category']) =>
    //         categories.map(cat => cat.id === category ? cat.name : '')
    //     , [activities])

    // const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    // Llama al custom hook y extrae state, dipatch y las funciones que fueron trasladadas
    const { state, dispatch, isEmptyActivities, categoryName } = useActivity();

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">
                Comida y actividades
            </h2>

            {isEmptyActivities ? <p className="text-center my-5">No hay actividades aún...</p> :
                // Reemplaza activities por state.activities
                state.activities.map(activity => (
                    <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
                        <div className="space-y-2 relative">
                            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                {categoryName(+activity.category)}
                            </p>
                            <p className="text-2xl font-bold pt-5">
                                {activity.name}
                            </p>
                            <p className="font-black text-4xl text-lime-500">
                                {activity.calories} {''}
                                <span>Calorias</span>
                            </p>
                        </div>

                        <div className="flex gap-5 items-center">
                            <button
                                onClick={() => dispatch({
                                    type: 'set-activeId',
                                    payload: { id: activity.id }
                                })}
                            >
                                <PencilSquareIcon className="h-8 w-8 text-gray-800" />
                            </button>
                            <button
                                onClick={() => dispatch({
                                    type: 'delete-activity',
                                    payload: { id: activity.id }
                                })}
                            >
                                <XCircleIcon className="h-8 w-8 text-red-800" />
                            </button>

                        </div>
                    </div>
                ))}
        </>
    )
}
