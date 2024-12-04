import { OrderItem } from '../types'
import { formatCurrency } from '../helpers';
import { Dispatch } from 'react';
import { OrderActions } from '../reducers/order-reducer';

type OrderContentsProps = {
    order: OrderItem[];
    // removeItem: (id: MenuItem['id']) => void
    // Establece el type para dispatch
    dispatch: Dispatch<OrderActions>
}

// Recibe dispatch en lugar de removeItem
export default function OrderContents({ order, dispatch }: OrderContentsProps) {
    return (
        <div>
            <h2 className='font-black text-4xl'>Consumo</h2>

            <div className='space-y-3 mt-10'>
                {
                    order.map(item => (
                        <div
                            key={item.id}
                            className='flex items-center justify-between border-t border-gray-200 py-5 last-of-type:border-b'
                        >
                            <div>
                                <p className='text-lg'>
                                    {item.name} - {formatCurrency(item.price)}
                                </p>
                                <p className='font-black'>
                                    Cantidad: {item.quantity} - {formatCurrency(item.price * item.quantity)}
                                </p>
                            </div>

                            <button className='bg-red-600 h-8 w-8 rounded-full text-white'
                                // onClick={() => removeItem(item.id)}
                                // Llama a la acción remove-item y pasa el id como payload
                                onClick={() => dispatch({
                                    type: 'remove-item',
                                    payload: { id: item.id }
                                })}
                            // Ahora puedes eliminar elementos de la orden
                            >
                                X
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>


    )
}
