import { OrderActions } from "../reducers/order-reducer"
import type { MenuItem } from "../types"

type MenuItemProps = {
    item: MenuItem,
    // addItem: (item: MenuItem) => void

    // Define el tipo de dato para el dispatch e importa OrderActions
    dispatch: React.Dispatch<OrderActions>
}

// Pasa dispatch en lugar de addItem
export default function MenuItem({ item, dispatch }: MenuItemProps) {

    return (
        <>
            <button className="border-2 border-teal-400 hover:bg-teal-200 w-full p-3 flex justify-between"
                // onClick={() => addItem(item)}
                // Llama al dispatch
                onClick={() => dispatch({
                    type: 'add-item',
                    // Como en orderActions esta definido en el payload un item y pasa a su vez un item, se simplifica {item: item} a:
                    payload: { item }
                    // Solamente se pasa el objeto item

                    // Puedes revisar React Developer Tools, componente App para ver los items que se agregan luego de pulsar el botón para agregar un item, en el reducer se escribe en order
                })}
            >
                <p>{item.name}</p>
                <p className="font-black">${item.price}</p>
            </button>
        </>
    )

}

