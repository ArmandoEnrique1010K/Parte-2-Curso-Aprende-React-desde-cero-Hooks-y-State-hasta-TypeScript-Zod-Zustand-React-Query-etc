// Este componente representa un context, lleva el sufijo "Context" en el nombre del archivo. Tiene una sintaxis de JSX

// No olvidar importar createContext de react
import { createContext, Dispatch, ReactNode, useReducer } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

// Tercero, crea un type
type BudgetContextProps = {
    // Puedes inferir colocando el cursor sobre el state y dispatch en el useReducer
    state: BudgetState
    // dispatch: React.Dispatch<BudgetActions>
    dispatch: Dispatch<BudgetActions>

}

// Segundo, crea el context con una función especial llamada createContext, requiere un valor por defecto. Se tiene que decirle que es lo que va a manejar el provider
// export const BudgetContext = createContext();

// Para solucionar el error del argumento vacio, puedes colocar el tipo de dato entre un comodin (< >) y como argumento un objeto vacio y luego castearlo como BudgetContextProps, pasa state y dispatch
// export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps);

// Otra opción es colocar un null! en el argumento
export const BudgetContext = createContext<BudgetContextProps>(null!);

// Recuerda que los types son para dar información, pero no hace nada en el codigo, solamente da información para los tipos de datos


// Children Puede ser un parrafo, formulario, componente para el tipo de dato VSCode especifica que es de tipo any, crea un type para la prop children
type BugdetProviderProps = {
    // Comunmente se utiliza el type ReactNode (se tiene que importar)
    children: ReactNode
}



// Primero se tiene que crear el provider, es de donde vienen los datos.
// Como los datos vienen del reducer, se tiene que agregarlo para tener acceso al estado y las funciones que modifican el estado
export const BudgetProvider = ({ children }: BugdetProviderProps) => {

    // Puedes utilizar otros hooks: useState, useEffect, etc.
    // Aqui se tiene que instanciar el reducer (recuerda la sintaxis de useReducer)
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    // Pasale el state y dispatch para que cada vez que se utilice el provider se tenga acceso al reducer y a sus funciones

    // Para conectar el context y el provider, se realiza lo siguiente: colocar BudgetContext con sintaxis de componente y pasarle el state y dispatch, para aquello recibe la prop children en el provider, de esa forma al utilizar este componente se podra utilizar el state y dispatch

    // Children es un prop especial que existe en React para hacer referencia a los hijos de un componente. No olvidar pasar el tipo de dato

    return (
        <BudgetContext.Provider
            // Pasa la prop value, siempre es un objeto, retorna otro objeto y como el context va a tener state y dispatch, se colocan dentro del objeto
            value={
                {
                    // El context espera lo siguiente
                    state, dispatch
                }
            }
        >
            {/* Aqui se pasa children */}
            {children}
        </BudgetContext.Provider>
    )
}

// En resumen:
// Ya se tiene el boilerplate del context
// Se tiene 2 partes: context (genera el contexto) y provider (de donde vienen los datos)