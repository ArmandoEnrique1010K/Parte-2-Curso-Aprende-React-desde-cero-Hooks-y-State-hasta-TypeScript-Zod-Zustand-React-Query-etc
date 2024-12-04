// Crea el siguiente reducer para las ordenes

import { MenuItem, OrderItem } from "../types"

// Define el type de acciones
// Recuerda guiarte de las funciones desde useOrder
export type OrderActions = {
    // Como la función addItem toma un parametro item, se especifica en el payload, al igual que su type MenuItem (requiere importarlo)
    type: 'add-item',
    payload: {
        item: MenuItem
    }
} | {
    // Similar a la función removeItem, en este caso como payload requiere el id del item
    type: 'remove-item',
    payload: {
        id: MenuItem['id']
    }
} | {
    // Similar a la función placeOrder, no requiere payload
    type: 'place-order'
} | {
    // Se agrega otro type para la acción de agregar la propina, como en useOrden se pasa la función setTip directamente en este caso se define un nuevo action
    type: 'add-tip',
    payload: {
        value: number
    }
}


// No olvidar el type para el state inicial
export type OrderState = {
    order: OrderItem[],
    tip: number
}

// Para el valor inicial del state, en useOrder se tiene el arreglo de ordenes (order) y la propina (tip)
export const initialState: OrderState = {
    order: [],
    tip: 0
}

// Crea la función de tipo reducer
export const orderReducer = (
    state: OrderState = initialState,
    action: OrderActions
) => {

    // Se definen las acciones con un if
    if (action.type === 'add-item') {

        // Contenido de la función desde useOrder
        // const itemExist = order.find(orderItem => orderItem.id === item.id);

        // if (itemExist) {
        //     const updatedOrder = order.map(orderItem => orderItem.id === item.id
        //         ?
        //         { ...orderItem, quantity: orderItem.quantity + 1 }
        //         :
        //         orderItem);
        //     setOrder(updatedOrder);
        // } else {
        //     const newItem: OrderItem = { ...item, quantity: 1 };
        //     setOrder([...order, newItem])
        // }

        // Recuerda que en lugar de orden se utiliza state.order para hacer referencia al state de order

        // Como se pasa un id, ese seria el payload (action.payload)
        const itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id)

        // Define una variable para almacenar la orden actualizada, de tipo OrderItem (arreglo)
        let order: OrderItem[] = []

        if (itemExist) {
            // Aqui tambien se reemplaza order por state.order

            // En lugar de definir una constante updateOrder, se modifica la variable order
            order = state.order.map(orderItem => orderItem.id === action.payload.item.id
                ?
                { ...orderItem, quantity: orderItem.quantity + 1 }
                :
                orderItem);

        } else {
            // Como item es el nuevo elemento que se agrega a la orden, se utiliza action.payload.item
            const newItem: OrderItem = { ...action.payload.item, quantity: 1 };

            // Actualiza la orden
            order = [...state.order, newItem]
        }

        // Siempre retorna el mismo state para no perder los elementos previos
        return {
            ...state,
            // Se establece la variable order (order: order)
            order
        }
    }

    if (action.type === 'remove-item') {
        // Contenido de la función desde useOrder
        // setOrder(order.filter(item => item.id !== id))

        // Realiza el mismo procedimiento al reemplazar order e id
        const order = state.order.filter(item => item.id !== action.payload.id)

        return {
            ...state,
            order
        }
    }


    if (action.type === 'place-order') {

        // Contenido de la función desde useOrder
        // setOrder([])
        // setTip(0)

        return {
            ...state,
            // Puedes actualizar el state de forma directa
            order: [],
            tip: 0
        }
    }

    // Esta acción se crea porque useReducer no tiene una función que modifica el state directamente
    if (action.type === 'add-tip') {

        // Constante para la propina
        const tip = action.payload.value

        return {
            ...state,
            // Establece la propina
            tip
        }
    }

    // Siempre retorna el state al final
    return state
}