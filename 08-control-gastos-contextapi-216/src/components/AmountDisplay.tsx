import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    // Convierte esta propiedad en opcional con (?), la propiedad puede venir o no
    label?: string,
    amount: number,
}

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
    return (
        <p className="text-2xl text-blue-600 font-bold">
            {/* En el caso de que no se pase ningun label no se tiene que mostrar los dos puntos y el espacio en blanco, para aquello puedes utilizar un ternario simplificado */}

            {/* {label}: {''} */}
            {label && `${label}: `}

            <span className="font-black text-black">
                {formatCurrency(amount)}
            </span>
        </p>
    )
}
