import type { Dispatch } from "react"
import { OrderActions } from "../reducers/order-reducer"

const tipOptions = [
    {
        id: 'tip-10',
        value: .10,
        label: '10%'
    },
    {
        id: 'tip-20',
        value: .20,
        label: '20%'
    },
    {
        id: 'tip-50',
        value: .50,
        label: '50%'
    },
]

type TipPercentageFormProps = {
    // setTip: Dispatch<SetStateAction<number>>

    // Establece el type para el dispatch (importa OrderActions)
    dispatch: Dispatch<OrderActions>
    tip: number
}

// En lugar de recibir setTip se recibe dispatch
export default function TipPercentageForm({ dispatch, tip }: TipPercentageFormProps) {
    return (
        <div>
            <h3 className="font-black text-2xl">Propina:</h3>
            <form>
                {tipOptions.map(tipOption => (
                    <div key={tipOption.id} className="flex gap-2">
                        <label htmlFor={tipOption.id}>{tipOption.label}</label>
                        <input
                            id={tipOption.id}
                            type="radio"
                            name="tip"
                            value={tipOption.value}
                            // onChange={e => setTip(+e.target.value)}
                            // Se llama al action de tipo add-tip, como payload se pasa el mismo valor que modifica el state
                            onChange={e => dispatch({
                                type: 'add-tip',
                                payload: { value: +e.target.value }
                                // Se podria utilizar valueAsNumber en lugar de value, pero no es una buena opción cuando se trata de radio buttons
                            })}
                            checked={tipOption.value === tip}
                        />
                    </div>
                ))}
            </form>
        </div>
    )
}
