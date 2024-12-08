import { v4 as uuidv4 } from 'uuid';
import { DraftExpense, Expense } from "../types"

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } }
    // Añade un nuevo type para obtener el gasto por su id
    | { type: 'get-expense-by-id', payload: { id: Expense['id'] } }
    // Type para actualizar un gasto, el gasto es de tipo Expense
    | { type: 'update-expense', payload: { expense: Expense } }

// Cuando se crea un nuevo gasto es de tipo DraftExpense, es temporal porque se genera un nuevo id en la función createExpense. Pero cuando se actualiza se trata de un gasto que ya tiene un id

export type BudgetState = {
    budget: number
    modal: boolean
    expenses: Expense[]
    // Añade una nueva propiedad para seleccionar el id a editar
    editingId: Expense['id']
}

// Para obtener consistencia en los gastos, de tal manera que no se pierdan al actualizar la pagina, se requiere el presupuesto (budget) y los gastos (expenses)

// Función para el valor inicial del presupuesto
const initialBudget = (): number => {
    // Almacena el valor del key 'budget' en la constante
    const localStorageBudget = localStorage.getItem('budget');
    // En el caso de que exista, devuelve el valor almacenado, de lo contrario un 0
    return localStorageBudget ? +localStorageBudget : 0
}

// Realiza el mismo procedimiento para los gastos (valor inicial si no existe, un arreglo vacio)
const initialExpenses = (): Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    // Recuerda que JSON.parse sirve para convertir un string de tipo JSON a un objeto
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

// Las funciones en el reducer funcionan correctamente con el uso de localStorage

export const initialState: BudgetState = {
    // El valor inicial se asigna llamando a la función
    budget: initialBudget(),
    // budget: 0,

    modal: false,

    // Llama a la función para asignar el valor inicial
    expenses: initialExpenses(),
    // expenses: [],

    // El valor inicial es un string vacio
    editingId: ''
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
            // Cada vez que se cierre el modal, el id a editar se debe limpiar
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

    // Acción para seleccionar o identificar un gasto por id
    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            // Escribe el id recibido como payload en el state de editingId
            editingId: action.payload.id,
            // Establece el modal en true para mostrar la ventana modal
            modal: true
        }
    }

    // Acción para actualizar un gasto
    if (action.type === 'update-expense') {
        return {
            ...state,

            // Utiliza el metodo para map iterar en cada gasto y buscar el que coincida por el id del state.editingId 
            // expenses: state.expenses.map(expense => expense.id === state.editingId)

            // Por otro lado, el gasto que se va a actualizar tiene su propio id
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ?
                // Si lo detecta que es igual, reescribe el gasto 
                action.payload.expense
                :
                // Caso contrario se mantiene el mismo gasto
                expense
            ),
            // No olvidar cerrar la ventana modal cambiando el state de modal
            modal: false,
            // Establece el id seleccionado por un string vacio
            editingId: ''
        }
    }

    return state;
}

