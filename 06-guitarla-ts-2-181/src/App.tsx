import { Header } from "./components/Header";
import { Guitar } from "./components/Guitar";
import { useEffect, useReducer } from "react";
import { cartReducer, initialState } from "./reducers/cart-reducer";

function App() {

  // Elimina las propiedades cart, isEmpty, cartTotal, removeFromCart, increaseQuantity, decreaseQuantity y clearCart. Como se elimina todo, ya no se puede llamar al custom hook useCart
  // const { cart, isEmpty, cartTotal, removeFromCart, increaseQuantity, decreaseQuantity,clearCart } = useCart();

  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Pega aqui el codigo desde useCart
  useEffect(() => {
    // Recuerda en lugar de cart se utiliza state.cart
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // Ahora el carrito es persistente, no se pierden los productos al actualizar la pagina
  return (

    <>
      <Header
        // Pasa state.cart en lugar de cart
        cart={state.cart}
        // En lugar de removeFromCart u otra función se pasa el dispatch
        // VSCode infiere en el tipo de dato: React.Dispatch<CartActions>
        dispatch={dispatch}
      // removeFromCart={removeFromCart}
      // increaseQuantity={increaseQuantity}
      // decreaseQuantity={decreaseQuantity}
      // clearCart={clearCart}
      // Se eliminan estas props
      // isEmpty={isEmpty}
      // cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            // El error desaparece luego de aplicar los cambios en el action de "add-to-cart" en el reducer
            state.data.map((guitar) => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                dispatch={dispatch}
              />
            ))
          }
        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App