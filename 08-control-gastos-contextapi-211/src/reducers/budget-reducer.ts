import { v4 as uuidv4 } from 'uuid';
import { DraftExpense, Expense } from "../types"

export type BudgetActions =
    {
        type: 'add-budget',
        payload: { budget: number }
    } | {
        type: 'show-modal',
    } | {
        type: 'close-modal'
    }

    // Agrega un nuevo type para la acción de agregar un nuevo gasto, requiere un payload expense
    | {
        type: 'add-expense',
        payload: { expense: DraftExpense }
    }

export type BudgetState = {
    budget: number
    modal: boolean
    // Se necesita un arreglo de gastos (se importa de types/index.ts)
    expenses: Expense[]
}

export const initialState: BudgetState = {
    budget: 0,
    modal: false,
    // Inicialmente se define expenses como un arreglo vacio
    expenses: []
}


// Una vez que se genera un gasto (cuando se agrega) se tiene que asignar el id, instala la depedencia de uuid con el comando "npm i uuid" y luego las definiciones de type para uuid con "npm i --save-dev @types/uuid"

// Para asignar el type, tiene un parametro de tipo DraftExpense y se espera que retorne un objeto de tipo Expense
const createExpense = (draftExpense: DraftExpense): Expense => {
    // Retorna un objeto, una copia de draftExpense y se genera un id
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
            modal: false
        }
    }

    // Acción para agregar un nuevo gasto
    if (action.type === 'add-expense') {

        // Llama a la función createExpense, pasando el payload
        const expense = createExpense(action.payload.expense)

        return {
            ...state,
            // Crea una copia del state expenses y agrega el payload recibido
            expenses: [
                ...state.expenses,
                // action.payload.expense
                // En lugar de retornar el payload, retorna la constante expense
                expense
            ],
            // Cierra la ventana modal luego de agregar el nuevo gasto
            modal: false

            // Con reducer tienes la habilidad de tener logica y escribir en multiples states al mismo tiempo a diferencia de useState
        }
    }
    return state;
}

