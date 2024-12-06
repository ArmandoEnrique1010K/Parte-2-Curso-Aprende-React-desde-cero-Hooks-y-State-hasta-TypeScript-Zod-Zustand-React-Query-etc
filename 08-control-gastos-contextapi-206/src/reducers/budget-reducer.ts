export type BudgetActions =
    {
        type: 'add-budget',
        payload: { budget: number }
    }
    // Añade un nuevo type para la acción de mostrar y cerrar la ventana modal
    | {
        type: 'show-modal',
    } | {
        type: 'close-modal'
    }


export type BudgetState = {
    budget: number
    // Nuevo type para la ventana modal
    modal: boolean
}

export const initialState: BudgetState = {
    budget: 0,
    // Añade un valor inicial para el modal
    modal: false
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    // Acción para mostrar el modal
    if (action.type === 'show-modal') {
        return {
            ...state,
            // Establece el valor de modal a true
            modal: true
        }
    }

    // Acción para cerrar u ocultar el modal
    if (action.type === 'close-modal') {
        return {
            ...state,
            // Establece el valor de modal a false
            modal: false
        }
    }

    return state;
}