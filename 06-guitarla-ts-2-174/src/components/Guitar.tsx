import { Dispatch } from 'react';
import { CartActions } from '../reducers/cart-reducer';
import type { Guitar } from '../types/index';

type GuitarProps = {
    guitar: Guitar,
    // addToCart: (item: Guitar) => void

    // Como dispatch (previamente addToCart) no es una función, se establece el type a Dispath
    // dispatch: React.Dispatch<CartActions>
    // Puedes importar Dispatch de React para simplificar
    dispatch: Dispatch<CartActions>
    // No olvidar importar el type CartActions para que reconozca las acciones que se van a utilizar
}

// Recibe la prop dispatch en lugar de addToCart
export function Guitar({ guitar, dispatch }: GuitarProps) {

    const { name, image, description, price } = guitar

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">

            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">$ {price}</p>

                <button
                    type="button"
                    className="btn btn-dark w-100"
                    // onClick={() => addToCart(guitar)}
                    // Se utiliza el dispatch con el type add-to-cart, como payload se necesita pasar un item con el valor de guitar
                    onClick={() => dispatch(
                        {
                            type: 'add-to-cart',
                            payload: { item: guitar }
                            // En el payload se tiene en cuenta el nombre de la propiedad item, esta definido en cart-reducer
                        }
                    )}
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}