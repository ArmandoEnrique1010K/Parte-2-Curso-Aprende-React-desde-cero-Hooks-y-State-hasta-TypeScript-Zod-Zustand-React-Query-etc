import AmountDisplay from "./AmountDisplay";

// Componente para mostrar el presupuesto definido, incluido los calculos
export default function BudgetTracker() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                {/* Muestra la imagen */}
                <img src="/grafico.jpg" alt="Grafica de gastos" />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                {/* Botón para reiniciar la App */}
                <button
                    type="button"
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                >
                    Resetear App
                </button>

                {/* Renderiza el componente para mostrar una cantidad o un calculo */}
                <AmountDisplay
                    // Para que sea dinamico se pasan props
                    label="Prespuesto"
                    amount={300}
                />
                <AmountDisplay
                    label="Disponible"
                    amount={200}
                />
                <AmountDisplay
                    label="Gastado"
                    amount={100}
                />

            </div>
        </div>
    )
}
