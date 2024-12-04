import { useState } from "react"
import type { MenuItem, OrderItem } from "../types";

// Puedes eliminar este archivo ya que no se utiliza
export default function useOrder() {

    const [order, setOrder] = useState<OrderItem[]>([])

    const [tip, setTip] = useState(0)

    // Traslada todo el contenido de la función addItem hacia order-reducer
    const addItem = (item: MenuItem) => {
        const itemExist = order.find(orderItem => orderItem.id === item.id);

        if (itemExist) {
            const updatedOrder = order.map(orderItem => orderItem.id === item.id
                ?
                { ...orderItem, quantity: orderItem.quantity + 1 }
                :
                orderItem);
            setOrder(updatedOrder);
        } else {
            const newItem: OrderItem = { ...item, quantity: 1 };
            setOrder([...order, newItem])
        }
    }

    // Realiza el mismo procedimiento con las demás funciones
    const removeItem = (id: MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== id))
    }

    const placeOrder = () => {
        setOrder([])
        setTip(0)
    }

    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder
    }
}