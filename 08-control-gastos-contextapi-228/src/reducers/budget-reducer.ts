import { v4 as uuidv4 } from 'uuid';
import { Category, DraftExpense, Expense } from "../types"

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
    { type: 'update-expense', payload: { expense: Expense } }
    // Crea una acción para reiniciar la aplicación (no requiere payload)
    | { type: 'reset-app' }
    // Crea una acción para seleccionar una categoria para filtrar
    | { type: 'add-filter-category', payload: { id: Category['id'] } }

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    editingId: Expense['id']
    // Añade un nuevo type para el state para la categoria seleccionada
    currentCategory: Category['id']
}

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? +localStorageBudget : 0
}

const initialExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}


export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId: '',
    // Valor inicial para la categoria seleccionada (el id es de tipo string)
    currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4()
    }
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

    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if (action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            expenses: [
                ...state.expenses,
                expense
            ],
            modal: false
        }
    }

    if (action.type === 'remove-expense') {
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
        }
    }

    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ?
                action.payload.expense
                :
                expense
            ),
            modal: false,
            editingId: ''
        }
    }

    // Acción para reiniciar la aplicación
    if (action.type === 'reset-app') {
        return {
            // Solamente se reinicia lo necesario
            ...state,
            budget: 0,
            expenses: [],
        }
    }

    // Acción para seleccionar la categoria
    if (action.type === 'add-filter-category') {
        return {
            ...state,
            // Recibe el id de la categoria en el payload
            currentCategory: action.payload.id
        }
    }

    return state;
}

