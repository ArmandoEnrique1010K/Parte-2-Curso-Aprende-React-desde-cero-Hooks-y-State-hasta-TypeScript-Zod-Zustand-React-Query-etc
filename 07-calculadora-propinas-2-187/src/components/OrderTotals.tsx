import { Dispatch, useCallback } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"
import { OrderActions } from "../reducers/order-reducer"

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    // placeOrder: () => void

    // Asigna el type para dispatch
    dispatch: Dispatch<OrderActions>
}

// En lugar de placeOrder, recibe dispatch
export default function OrderTotals({ order, tip, dispatch }: OrderTotalsProps) {

    const subtotalAmount = useCallback(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    const tipAmount = useCallback(() => subtotalAmount() * tip, [tip, order])


    const totalAmount = useCallback(() => subtotalAmount() + tipAmount(), [tip, order])

    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Totales y Propinas:</h2>
                <p>
                    Subtotal a pagar: {''}
                    <span className="font-bold">{formatCurrency(subtotalAmount())}</span>

                </p>
                <p>
                    Propina: {''}
                    <span className="font-bold">{formatCurrency(tipAmount())}</span>
                </p>
                <p>
                    Total a Pagar: {''}
                    <span className="font-bold">{formatCurrency(totalAmount())}</span>
                </p>
            </div>

            <button
                className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
                disabled={totalAmount() === 0}
                // onClick={placeOrder}
                // Llama al dispatch para guardar la orden
                onClick={() => dispatch({
                    type: 'place-order',
                })}
            // Ahora puedes "guardar la orden" (en realidad limpia la orden)
            >
                Guardar Orden
            </button>
        </>
    )
}
