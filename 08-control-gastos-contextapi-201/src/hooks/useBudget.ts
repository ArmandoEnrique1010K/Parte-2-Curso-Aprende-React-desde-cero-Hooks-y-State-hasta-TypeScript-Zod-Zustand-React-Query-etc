// Custom hook para el budget, se ha creado para no estar escribiendo useContext y pasarle el context

// Importa useContext y el context que va a utilizar
import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {

    // Utiliza el hook useContext para conectar con el context creado
    const context = useContext(BudgetContext)

    // Una buena practica es que si no se tiene un context se puede lanzar un error
    if (!context) {
        throw new Error("useBudget must be used within a BudgetProvider")
    }

    // El error indica que el provider tiene que rodear la aplicación con un provider para hacer uso del custom hook, se esta forma se crea las librerias que utilizan Context API

    // Retorna el context, de esta forma puedes llamar al hook y no se tendria que mandar a llamar a useContext por cada componente para pasarle el context, sino que solamente se tendria que llamar a este hook personalizado
    return context;
}