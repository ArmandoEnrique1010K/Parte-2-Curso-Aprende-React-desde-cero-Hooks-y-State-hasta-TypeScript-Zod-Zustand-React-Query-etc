import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

export type CartActions = {
    type: 'add-to-cart'
    payload: { item: Guitar }
} | {
    type: 'remove-from-cart'
    payload: { id: Guitar['id'] }
} | {
    type: 'decrease-quantity'
    payload: { id: Guitar['id'] }
} | {
    type: 'increase-quantity'
    payload: { id: Guitar['id'] }
} | {
    type: 'clear-cart'
}

export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

// Pega aqui el codigo para establecer el valor inicial del carrito (desde useCart)
const initialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
};
// Recuerda que utiliza localStorage para almacenar los items en el navegador del usuario

export const initialState: CartState = {
    data: db,
    // En lugar de un arreglo vacio llama a la función initialCart
    cart: initialCart()
}

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions,
) => {

    if (action.type === "add-to-cart") {
        // Suele pasar en React que al trasladar el codigo hacia un reducer no funcione correctamente

        // Para solucionar el error de que no agregue el item al carrito, se utiliza el metodo find en lugar de findIndex

        // findIndex retornaba un numero de la posición del elemento del arreglo del carrito. find retorna el elemento existente o undefined si no existe
        const itemExists = state.cart.find((guitar) => guitar.id === action.payload.item.id);

        console.log(itemExists)

        let updatedCart: CartItem[] = []

        // Esto se comenta
        // if (itemExists >= 0) {
        //     if (state.cart[itemExists].quantity >= MAX_ITEMS) return;
        //     const updatedCart = [...state.cart];
        //     updatedCart[itemExists].quantity++;
        // } else {
        //     const newItem: CartItem = { ...action.payload.item, quantity: 1 }
        //     updatedCart = [...state.cart, newItem]
        // }

        // Se verifica si existe el item
        if (itemExists) {
            // Modifica el valor de updatedCart utilizando el metodo map para iterar en el state de cart
            updatedCart = state.cart.map(item => {
                // Encuentra el elemento que el usuario esta agregando de forma repetida
                if (item.id === action.payload.item.id) {
                    // Si la cantidad es menor que el limite maximo
                    if (item.quantity < MAX_ITEMS) {
                        // Devuelve una copia de item y la cantidad se incrementa en 1
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        // Caso contrario, retorna el mismo elemento, solamente si pasa del limite maximo
                        return item
                    }
                } else {
                    // Elemento que no se agrega como repetido y no se va a perder en el carrito
                    return item
                }
            })
            // Ahora la logica del carrito es compleja, pero funciona sin errores en el navegador, puedes agregar un item, agregar el mismo item para agregar uno y no sobrepasar el limite maximo. Puedes revisarlo desde React Developer Tools, componente App, revisa el reducer, propiedad cart
        } else {
            const newItem: CartItem = { ...action.payload.item, quantity: 1 }
            updatedCart = [...state.cart, newItem]
        }


        return {
            ...state,
            cart: updatedCart
        }
    }

    if (action.type === "remove-from-cart") {

        // Aqui se traslada la función desde useCart
        // setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));

        // En lugar de setCart, se tiene que crear una variable y luego adaptarla al nuevo state, se actualiza el state de cart filtrando todos los items a excepción del item cuyo id coincide con el del payload
        const updatedCart = state.cart.filter((item) => item.id !== action.payload.id)

        // El state de cart se actualiza a updatedCart
        return {
            ...state,
            cart: updatedCart

            // Podrias renombrar la constante updatedCart a cart para utilizar lo siguiente
            // ...state,
            // cart

            // O modificar el state de manera directa
            // ...state,
            // cart: state.cart.filter((item) => item.id !== action.payload.id)
        }
    }

    if (action.type === "increase-quantity") {

        // Reemplaza cart por state.cart
        const updatedCart = state.cart.map((item) => {
            // Como se pasa un id, ese sera el payload
            if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }

            return item;
        });

        // setCart(updatedCart);

        // Puedes pasarle updatedCart al state de cart
        return {
            ...state,
            cart: updatedCart

            // O renombrar la constante updateCart por cart y pasarle lo siguiente:
            // ...state,
            // cart
        }
    }

    // Repite el mismo procedimiento con la acción decrease-quantity
    if (action.type === "decrease-quantity") {

        // En este caso se utiliza la constante cart
        const cart = state.cart.map((item) => {
            if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
        });

        // setCart(updatedCart);

        return {
            ...state,
            // Y se simplifica cart: cart ---> cart
            cart
        }
    }


    if (action.type === "clear-cart") {
        // Esta acción no tiene logica, solamente se establece un arreglo vacio para cart, tal y como esta definido en la función clearCart
        // setCart([]);

        return {
            ...state,
            cart: []
        }
    }

    return state;
}

