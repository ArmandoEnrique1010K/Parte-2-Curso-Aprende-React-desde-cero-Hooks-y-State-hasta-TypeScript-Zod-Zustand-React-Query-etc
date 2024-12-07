import { useMemo } from "react"
// Importa los componentes de Swipe y la hoja de estilos
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from "react-swipeable-list"
import "react-swipeable-list/dist/styles.css"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

// Componente para un gasto, recibe como prop expense (gasto), no olvidar definir el type
type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

    // Llama al custom hook para importar el dispatch para la acción de eliminar gasto
    const { dispatch } = useBudget();

    // Filtra en el arreglo categories para buscar una categoria cuyo id coincide con la categoria del gasto

    // Como filter devuelve un arreglo se posiciona al elemento del indice 0

    // Ejecuta cada vez que cambie el gasto (expense)
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    // Define una función para disparar la acción de Swipe leadingActions
    const leadingActions = () => (
        // Estructura de leadingActions
        // El componente SwipeAction requiere un evento onClick
        <LeadingActions>
            <SwipeAction
                onClick={() => { }}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions >
    )

    // Recuerda que se utiliza parentesis en lugar de llaves porque retorna un componente

    // Repite el mismo procedimiento con trailingActions (cambia el texto a eliminar)
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                // Aqui se llama al dispatch para eliminar el gasto, pasa el id en el payload
                onClick={() => dispatch({
                    type: 'remove-expense',
                    payload: { id: expense.id }
                })}
                // Se tiene la prop booleana destructive para eliminar el elemento
                destructive={true}

            // Arrastralo hacia la izquierda para eliminarlo, aplica una animación para eliminarlo, pero no lo elimina del state (verifica en BudgetProvider) si no se ha definido el dispatch, lo p edes verificar en BudgetProvider mediante React Developer Tools
            >
                Eliminar
            </SwipeAction>
        </TrailingActions >
    )

    // En el caso de que no ejecute el proyecto, ejecuta el siguiente comando para instalar prop-types: npm install prop-types

    // Luego de añadir un gasto en la aplicación web, arrastra un elemento del listado de gasto hacia la derecha o hacia la izquierda para ver el texto Actualizar y Eliminar

    // Puedes aplicar unos estilos a Swipe definiendolos en el archivo index.css

    return (

        // SWIPE

        // En lugar de utilizar iconos, unos efectos que tienen la aplicaciones es react-swipeable-list, arrastra un elemento y aparece una opción, soporta typescript

        // https://www.npmjs.com/package/react-swipeable-list

        // Comando para instalarlo: npm i react-swipeable-list

        // El componente SwipeableList sirve para envolver un elemento al que se aplicara Swipe
        <SwipeableList>
            {/* Tambien se debe especificar cuales son las acciones y la configuración, tambien rodea el componente u elemento */}

            {/* Requiere de una propiedad maxSwipe para especificar el porcentaje máximo que se recorrera para disparar la acción. Por ejemplo: 0.5 dispara cuando sobrepasa la mitad del elemento el arrastre */}
            <SwipeableListItem
                maxSwipe={1}
                // Tambien tiene las props leadingActions (arrastra hacia el lado derecho y realiza una acción) y trailingActions (arrastra hacia el lado izquierdo y realiza una acción)
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >

                {/* Recuerda que el contenido se mostrara por cada gasto que se haya registrado en el formulario */}
                <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        {/* Imagen de la categoria */}
                        <img
                            // Mezcla String con JavaScript para especificar la ruta dinamica
                            src={`/icono_${categoryInfo.icon}.svg`}
                            alt="icono gasto"
                            className="w-20"
                        />
                    </div>

                    {/* Aplicale estilos para expandir el contenido y un espaciado a sus elementos hijos */}
                    <div className="flex-1 space-y-2">
                        {/* El nombre de la categoria */}
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>

                        {/* Muestra el nombre y la fecha del gasto */}
                        <p>{expense.expenseName}</p>
                        {/* <p className="text-slate-600 text-sm">{expense.date?.toString()}</p> */}

                        {/* Como la propiedad date es de tipo Value, no se puede asignar a React Node, puedes convertirlo a string con toString(), opcionalmente puedes encadenar un optional chaining (?) */}

                        {/* Normalmente muestra la fecha en el siguiente formato: Thu Dec 05 2024 00:00:00 GMT-0500 (hora estándar de Perú). Para formatear una fecha puedes ir al archivo helpers/index.ts y crear una función para formatear la fecha */}

                        {/* Llama a la función, como VSCode infiere que el argumento podria ser de tipo null, se coloca un operador ! en lugar de ? (garantiza que el valor exista) */}
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>

                        {/* Posible resultado: viernes, 6 de diciembre de 2024 */}

                    </div>

                    {/* Renderiza el componente AmountDisplay, recuerda que en este caso representa una cantidad */}
                    <AmountDisplay
                        // Requiere las props amount y label (de manera opcional este ultimo)
                        amount={expense.amount}
                    // Ve al componente AmountDisplay para realizar unas modificaciones
                    />
                </div>

            </SwipeableListItem>


        </SwipeableList>
    )
}
