import { Header } from "./components/Header";
import { Guitar } from "./components/Guitar";
import { useCart } from "./hooks/useCart";
import { useReducer } from "react";
import { cartReducer, initialState } from "./reducers/cart-reducer";

function App() {

  // Elimina data, no retorna desde useCart luego tambien elimina addToCart porque se utiliza dispatch
  // const { data, cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal } = useCart();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal } = useCart();

  // Utiliza el hook useReducer para el state, la función recibe la función de tipo reducer y el estado inicial (se encuentran en cart-reducer)
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Muestra el state inicial desde la consola (se muestra un objeto con el cart y la data de las guitarras)
  console.log(state);

  return (

    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            // En lugar de data, se utiliza el state.data para realizar la iteración (se utiliza el state del reducer en lugar de data del custom hook useCart)
            // data.map((guitar) => (

            // Como posiblemente el state sea undefined, porque al agregar un nuevo item al carrito cause un error mostrando la pagina en blanco o no agregue el item al carrito
            state.data.map((guitar) => (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                // En lugar de addToCart se debe pasar el dispath como prop
                // addToCart={addToCart}
                dispatch={dispatch}
              // No olvidar especificar el type en el componente Guitar, coloca el cursor en addToCart para que VSCode infiera en el tipo de dato
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