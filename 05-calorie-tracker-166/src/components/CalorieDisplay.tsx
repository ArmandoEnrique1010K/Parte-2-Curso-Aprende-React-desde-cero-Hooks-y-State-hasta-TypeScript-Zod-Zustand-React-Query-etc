// Define el type para las props
type CalorieDisplayProps = {
    calories: number,
    text: string
}

// Componente para un calculo de calorias
export default function CalorieDisplay({ calories, text }: CalorieDisplayProps) {
    return (
        // Traslada el contenido desde CalorieTracker a CalorieDisplay, se aplican los mismos estilos
        <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
            {/* Aqui se muestra las props recibidas */}
            <span className="font-black text-6xl text-orange"> {calories}
            </span> {text}
        </p>

        // Tailwind puede llegar a utilizar varias clases para un elemento, es mejor que utilizar una hoja de estilos
    )
}
