import { Dispatch, useMemo } from "react"
// No olvidar eliminar las importaciones innecesarias
import type { CartItem } from "../types/index"
import { CartActions } from "../reducers/cart-reducer"

type HeaderProps = {
    cart: CartItem[]
    // Define el tipo de dato para la prop dispatch, no olvidar importar CartActions, tambien se simplifica importando Dispatch
    dispatch: Dispatch<CartActions>

    // removeFromCart: (id: Guitar['id']) => void
    //increaseQuantity: (id: Guitar['id']) => void
    // decreaseQuantity: (id: Guitar['id']) => void
    // clearCart: () => void
    // Se eliminan los types innecesarios
    // isEmpty: boolean
    // cartTotal: number
}

export function Header({
    cart,
    // Recibe la prop dispatch y se eliminan las funciones que se pasan desde el custom hook
    dispatch,
    // removeFromCart,
    // increaseQuantity,
    // decreaseQuantity,
    // clearCart,
    // Se eliminan las propiedades que no se reciben ni se van a utilizar
    // isEmpty,
    // cartTotal
}: HeaderProps) {

    // Se podria pasar los states desde el hook useCart, pero como los states isEmpty y cartTotal se utilizan en este componente, se puede omitir pasar desde useCart.

    // Aqui se traslada los states derivados, no olvidar importar useMemo
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(
        () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
        [cart]
    );

    // Ahora puedes ver los items agregados en el carrito de compras, inclusive muestra el precioTotal y un mensaje si esta vacio el carrito
    return (
        <header className="py-5 header" >
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div
                            className="carrito"
                        >
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                            <div id="carrito" className="bg-white p-3">
                                {/* La condición verifica si el carrito esta vacio */}
                                {isEmpty ? (
                                    <p className="text-center">El carrito esta vacio</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cart.map(guitar => (
                                                        <tr key={guitar.id}>
                                                            <td>
                                                                <img className="img-fluid"
                                                                    src={`/img/${guitar.image}.jpg`}
                                                                    alt="imagen guitarra" />
                                                            </td>
                                                            <td>{guitar.name}</td>
                                                            <td className="fw-bold">
                                                                {guitar.price}
                                                            </td>
                                                            <td className="flex align-items-start gap-4">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    // Se repite la misma acción que increaseQuantity
                                                                    // onClick={() => decreaseQuantity(guitar.id)}
                                                                    onClick={() => dispatch(
                                                                        {
                                                                            type: 'decrease-quantity',
                                                                            payload: { id: guitar.id }
                                                                        }
                                                                    )}

                                                                >
                                                                    -
                                                                </button>
                                                                {guitar.quantity}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-dark"
                                                                    // onClick={() => increaseQuantity(guitar.id)}

                                                                    // Llama al dispatch con la acción de increase-quantity y pasale el id en el payload
                                                                    onClick={() => dispatch(
                                                                        {
                                                                            type: 'increase-quantity',
                                                                            payload: { id: guitar.id }
                                                                        }
                                                                    )}
                                                                // Ahora puedes incrementarle la cantidad
                                                                >
                                                                    +
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    type="button"
                                                                    // onClick={() => removeFromCart(guitar.id)}
                                                                    // En lugar de la función removeFromCart se utiliza el dispatch, 
                                                                    // el type es remove-from-cart y el payload como requiere un id de tipo number, se especifica el id del objeto guitar
                                                                    onClick={() => dispatch({ type: 'remove-from-cart', payload: { id: guitar.id } })}
                                                                // Ahora puedes eliminar un item del carrito, dispara la acción al pulsar el botón de eliminar
                                                                >
                                                                    X
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        <p className="text-end">Total pagar: <span className="fw-bold">$ {cartTotal}</span></p>
                                    </>
                                )}
                                <button
                                    // onClick={clearCart}
                                    // Llama a la acción de clear-cart sin pasarle nada como payload
                                    onClick={() => dispatch({ type: "clear-cart" })}
                                    // Ahora puedes vaciar el carrito
                                    className="btn btn-dark w-100 mt-3 p-2"
                                >Vaciar Carrito</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div >
        </header >
    )
}
