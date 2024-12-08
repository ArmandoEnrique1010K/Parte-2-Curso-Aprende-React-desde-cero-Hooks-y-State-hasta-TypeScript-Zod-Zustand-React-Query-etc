import { createContext, Dispatch, ReactNode, useReducer } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

type BugdetProviderProps = {
    children: ReactNode
}

export const BudgetProvider = ({ children }: BugdetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

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