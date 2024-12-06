// Aqui se definen los types, por lo general se utilizan types
// Gasto
export type Expense = {
    // Identificador unico asociado (se genera hasta que se guarde el gasto)
    id: string
    // nombre del gasto
    expenseName: string
    // cantidad del gasto
    amount: number
    // categoria (segun el arreglo categories, id es un string)
    category: string
    // fecha tipo Value
    date: Value
}

// Segun react date picker, las fechas utilizan el siguiente type
// https://www.npmjs.com/package/react-date-picker
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

// Gasto temporal sin id (hereda el type Expense sin el id)
export type DraftExpense = Omit<Expense, 'id'>

// Type para el arreglo de categorias
export type Category = {
    id: string,
    name: string
    icon: string
}