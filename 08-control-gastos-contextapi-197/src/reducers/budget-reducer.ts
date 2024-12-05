// Reducer para el presupuesto

// type para las acciones,
export type BudgetActions =
    // type para agregar presupuesto, requiere un payload que es el presupuesto numerico
    {
        type: 'add-budget',
        payload: { budget: number }
    }

// type para el state local
export type BudgetState = {
    budget: number
}

// El valor inicial para el presupuesto es 0, no olvidar asignar el type BudgetState
export const initialState: BudgetState = {
    budget: 0
}

// Función de tipo reducer
export const budgetReducer = (
    // Se define el state inicial y el type para cada acción
    state: BudgetState = initialState,
    action: BudgetActions
) => {

    // Acción para agregar el presupuesto
    if (action.type === 'add-budget') {
        return {
            // Retorna una copia del state y se establece el presupuesto que se recibe desde el payload
            ...state,
            budget: action.payload.budget
        }
    }

    // Siempre retorna el state
    return state;
}