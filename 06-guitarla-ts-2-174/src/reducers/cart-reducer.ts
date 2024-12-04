import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

// Crea un reducer para el cart

// Lleva todo lo que hay en useCart hacia el reducer, crear un custom hook es una buena practica.

// Muchas librerias de React utilizan un custom hook

// 1° define los types para las acciones (se tiene en cuenta las funciones en useCart)
export type CartActions = {
    // Agregar al carrito, en el payload se recibe un item de tipo Guitar
    type: 'add-to-cart'
    payload: { item: Guitar }
} | {
    // Eliminar del carrito, recibe el id del item que se eliminara como payload
    type: 'remove-from-cart'
    payload: { id: Guitar['id'] }
} | {
    // Decrementar la cantidad, requiere el id del item como payload
    type: 'decrease-quantity'
    payload: { id: Guitar['id'] }
} | {
    // Incrementar la cantidad, requiere el id del item como payload
    type: 'increase-quantity'
    payload: { id: Guitar['id'] }
} | {
    // Vaciar el carrito, no requiere payload
    type: 'clear-cart'
}

// Las acciones si se traducen a un lenguaje tradicional, serian funciones que se tiene en el custom hook

// 2° define el type para el state inicial
export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

// 3° define el state inicial
export const initialState: CartState = {
    // Para la data se utiliza el arreglo definido en db.ts
    data: db,
    // En este caso, inicialmente se utiliza un arreglo vacio para el cart
    cart: []
}

// Se tiene que traer las 2 constantes de useCart para el limite de items
const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

// 4° crea la función reducer
export const cartReducer = (
    // Recuerda que se especifica el tipo de dato para el autocompletado. Se define el state inicial y las acciones disponibles
    state: CartState = initialState,
    action: CartActions,
) => {

    // Acción para agregar al carrito

    // Antes de definir el action.type se muestra el autocompletado
    if (action.type === "add-to-cart") {
        // Muestra un mensaje al llamar a la acción
        // console.log("desde add-to-cart")

        // Aqui se traslada el contenido de la función addToCart definido en useCart

        // Recuerda que se revisa un elemento para evitar registros duplicados

        // En lugar de cart, es state.cart para que haga referencia al state

        // En useCart se pasaba el item, que es el elemento sobre el cual se presionaba para agregarlo al carrito, el item.id es parte del action.payload.item.id
        const itemExists = state.cart.findIndex((guitar) => guitar.id === action.payload.item.id);

        // Como el reducer solamente tiene un return, se define una variable para almacenar el carrito, como valor inicial es un arreglo de tipo CartItem
        let updatedCart: CartItem[] = []

        // Condición si el item ya existia en el carrito
        if (itemExists >= 0) {
            // Recuerda que se reemplaza cart por state.cart y se tiene que definir MAX_ITEMS antes de la función reducer
            if (state.cart[itemExists].quantity >= MAX_ITEMS) return;

            // No confundir la variable updateCart con esta constante en este alcance o ambito para el bloque if
            const updatedCart = [...state.cart];
            updatedCart[itemExists].quantity++;

            // No se requiere setCart, en este bloque if, se retorna directamente

            // setCart(updatedCart);
        } else {
            // Recuerda que se reemplaza item por action.payload.item
            const newItem: CartItem = { ...action.payload.item, quantity: 1 }

            // Se actualiza el updatedCart similar al setCart
            // setCart([...cart, newItem]);
            updatedCart = [...state.cart, newItem]
        }

        // Siempre debe retornar una copia del state para que no se pierda
        return {
            ...state,
            // Además del carrito actualizado (setea algo similar al setCart en el reducer)
            cart: updatedCart
        }
    }

    // Eliminar del carrito
    if (action.type === "remove-from-cart") {
        return {
            ...state
        }
    }

    // Decrementar la cantidad
    if (action.type === "decrease-quantity") {
        return {
            ...state
        }
    }

    // Incrementar la cantidad
    if (action.type === "increase-quantity") {
        return {
            ...state
        }
    }

    // Vaciar el carrito
    if (action.type === "clear-cart") {
        return {
            ...state
        }
    }

    // Al final siempre se debe tener un return con el state
    return state;
}

