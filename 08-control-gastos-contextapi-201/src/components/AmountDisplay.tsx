// Componente para mostrar un calculo

import { formatCurrency } from "../helpers"

// No olvidar el type
type AmountDisplayProps = {
    label: string,
    amount: number,
}

// Recibe las props y se asigna el type
export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
    return (
        // Muestra un parrafo
        <p className="text-2xl text-blue-600 font-bold">
            {label} {''}
            {/* Para formatear la cantidad, es necesario definir un helper o util (en la carpeta helpers, archivo index.ts) */}
            <span className="font-black text-black">
                {/* Llama a la función y pasa amount como argumento */}
                {formatCurrency(amount)}
            </span>
        </p>
    )
}
