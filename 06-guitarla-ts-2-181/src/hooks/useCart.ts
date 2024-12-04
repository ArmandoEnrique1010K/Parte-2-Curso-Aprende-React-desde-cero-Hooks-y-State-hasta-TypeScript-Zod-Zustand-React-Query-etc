// Luego de realizar los traslados puedes eliminar este archivo porque ya no se utiliza, gran parte de este codigo ha sido trasladado al reducer cart-reducer
// import { useEffect, useState } from "react";

// import type { Guitar, CartItem } from "../types/index";

// export const useCart = () => {

// Traslada esto hacia cart-reducer para establecerlo como el valor inicial del state
// const initialCart = (): CartItem[] => {
//   const localStorageCart = localStorage.getItem("cart");
//   return localStorageCart ? JSON.parse(localStorageCart) : [];
// };

// const [cart, setCart] = useState(initialCart);

// Como ya no se utilizan estas constantes en las funciones, se eliminan
// const MAX_ITEMS = 5;
// const MIN_ITEMS = 1;

// Traslada este efecto hacia App.tsx
// useEffect(() => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }, [cart]);

// Elimina esta función porque ya no se utiliza, en su lugar se utiliza la acción definida en el cart-reducer
// function addToCart(item: Guitar) {
//   const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

//   if (itemExists >= 0) {
//     if (cart[itemExists].quantity >= MAX_ITEMS) return;

//     const updatedCart = [...cart];
//     updatedCart[itemExists].quantity++;
//     setCart(updatedCart);
//   } else {
//     const newItem: CartItem = { ...item, quantity: 1 }
//     setCart([...cart, newItem]);
//   }
// }

// Elimina la función removeFromCart porque ya no se requiere
// function removeFromCart(id: Guitar['id']) {
//   // Traslada el contenido al reducer que contiene la acción de remove-from-cart
//   setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
// }

// Traslada el contenido de la función increaseQuantity al reducer y luego elimina la función
// function increaseQuantity(id: Guitar['id']) {
//   const updatedCart = cart.map((item) => {
//     if (item.id === id && item.quantity < MAX_ITEMS) {
//       return {
//         ...item,
//         quantity: item.quantity + 1,
//       };
//     }

//     return item;
//   });

//   setCart(updatedCart);
// }

// Se repite el mismo procedimiento con la función decreaseQuantity, no olvidar eliminar esta función
// function decreaseQuantity(id: Guitar['id']) {
//   const updatedCart = cart.map((item) => {
//     if (item.id === id && item.quantity > MIN_ITEMS) {
//       return {
//         ...item,
//         quantity: item.quantity - 1,
//       };
//     }
//     return item;
//   });
//   setCart(updatedCart);
// }

// Recuerda que esta función solamente establece el carrito a un arreglo vacio, tambien se elimina
// function clearCart() {
//   setCart([]);
// }

// Traslada los states derivados hacia el header
// const isEmpty = useMemo(() => cart.length === 0, [cart]);
// const cartTotal = useMemo(
//   () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
//   [cart]
// );

// No se exportan (retornan) las funciones y states eliminados
// return {
//   cart,
// addToCart,
// removeFromCart,
// increaseQuantity,
// decreaseQuantity,
// clearCart,
// isEmpty,
// cartTotal,
//   };
// };
