import { createContext, Dispatch, ReactNode, useReducer } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

// Primero se ha definido este context
type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>

}

// createContext permite crear el context
export const BudgetContext = createContext<BudgetContextProps>(null!);

type BugdetProviderProps = {
    children: ReactNode
}

// Pasa el type al children
export const BudgetProvider = ({ children }: BugdetProviderProps) => {

    // Utiliza el useReducer para llamar a las acciones utilizando dispatch
    const [state, dispatch] = useReducer(budgetReducer, initialState)

    // La forma para conectar el context con el provider es dentro de return
    return (
        <BudgetContext.Provider
            value={
                {
                    state, dispatch
                }
            }
        >
            {children}
        </BudgetContext.Provider>
    )
}

// Por lo general el boilerplate se reutiliza en varios proyectos