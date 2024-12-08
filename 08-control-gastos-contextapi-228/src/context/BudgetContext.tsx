import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    // Define los types
    totalExpenses: number
    remainingBudget: number
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

type BugdetProviderProps = {
    children: ReactNode
}

export const BudgetProvider = ({ children }: BugdetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    // Pega aqui el codigo desde BudgetTracker

    // Esto no se requiere, porque se tiene un state global
    // const { state } = useBudget()

    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
    const remainingBudget = state.budget - totalExpenses

    return (
        <BudgetContext.Provider
            value={
                {
                    state, dispatch,
                    // Exporta los calculos
                    totalExpenses,
                    remainingBudget
                }
            }
        >
            {children}
        </BudgetContext.Provider>
    )
}