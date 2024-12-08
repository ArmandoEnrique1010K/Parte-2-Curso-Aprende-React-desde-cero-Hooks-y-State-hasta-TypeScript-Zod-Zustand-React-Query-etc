// Una vez configurado el context para acceder al state y dispatch, en lugar de utilizar useContext para acceder al contexto, se crea un custom hook para que monte el contexto

import { useContext } from "react"
import { ActivityContext } from "../context/ActivityContext"

export const useActivity = () => {

    // Llama al contexto
    const context = useContext(ActivityContext);

    // En el caso de que el contexto no venga, se lanza un error
    if (!context) {
        throw new Error('el hook useActivity debe ser utilizado en un ActivityProvider')
    }

    // El error podria mostrarse si no se envuelve el componente <App/> con <ActivityProvider></ActivityProvider>

    // Retorna el context
    return context;

}