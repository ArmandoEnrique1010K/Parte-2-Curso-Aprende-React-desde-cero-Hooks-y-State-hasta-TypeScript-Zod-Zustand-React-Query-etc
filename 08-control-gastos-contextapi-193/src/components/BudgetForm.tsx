import { useMemo, useState } from "react"

// Componente para el formulario
export default function BudgetForm() {

    // Se requiere un state local para validar el formulario y escribirlo en el reducer
    const [budget, setBudget] = useState(0)

    // Función ejecutable por cada cambio en el campo del presupuesto, en el parametro "e" se asigna el tipo de dato
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Imprime el valor de los atributos name e id definido en el evento onChange del elemento <input>
        // console.log(e.target.name)
        // console.log(e.target.id)

        // Recupera el valor escrito en el campo
        // console.log(e.target.value)
        // Puedes utilizar valueAsNumber para imprimirlo como un numero 
        // console.log(e.target.valueAsNumber)

        // Ojo: En la consola de Chrome, los valores de tipo text se imprimen de color negro y los de tipo number se imprimen de color azul

        // Setea en el state budget el valor escrito en el <input>
        setBudget(e.target.valueAsNumber);

        // Puedes abrir React Developer Tools, componente BudgetForm, se tiene el state de budget, introduce texto en el <input> para ver el texto escrito
    }

    // Función para validar el presupuesto, utiliza useMemo para ejecutarla cada vez que cambie el state de budget
    const isValid = useMemo(() => {
        // Imprime el valor de budget
        // console.log(budget)
        // Puede imprimir un NaN si no hay un valor escrito (NaN es porque no es un numero)

        // En este caso puede imprimir un true o false si no es un numero el valor de budget
        // console.log(isNaN(budget))

        // Retorna true si el valor introducido no es un numero o si la cantidad es menor o igual que 0
        return isNaN(budget) || budget <= 0
    }, [budget])


    return (
        // La clase space-y-5 solamente afecta a los primeros hijos del elemento padre, no funcionan con sus subelementos hijos
        <form className="space-y-5">
            {/* flex-col hace que el contenido se vaya hacia abajo y se vuelve a definir la clase space-y-5 para que lo pueda aplicar a sus elementos hijos */}
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center ">
                    Definir Presupuesto
                </label>
                {/* Campo de entrada de texto de tipo number, en este caso se colocan los atributos id y name, cuyo valores coinciden entre ellos para utilizarlo como state */}
                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2"
                    placeholder="Define tu presupuesto"
                    name="budget"
                    // El value es igual al state budget, inicializa con el valor inicial
                    value={budget}
                    // Evento onChange, se ejecuta luego de cambiar el texto introducido
                    // Coloca lo siguiente para inferir en el tipo de dato
                    // React.ChangeEvent<HTMLInputElement>
                    // onChange={e => handleChange}
                    onChange={handleChange}
                />
            </div>
            {/* Botón para subir el formulario */}
            <input
                type="submit"
                value="Definir Presupuesto"
                // Recuerda que la pseudoclase hover aplica el estilo cuando colocas el cursor sobre el elemento y cursor-pointer cambia el tipo de cursor

                // Las clases font-bold y font-black sirven para aplicar negrita al texto, se diferencia por la cantidad de negrita (font-weight de 700 y 900)
                // disabled aplica los estilos solamente si el botón esta inhabilitado
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black disabled:opacity-40"

                // Deshabilita el botón llamando a la función isValid para verificar si no es un numero el valor ingresado en el presupuesto
                disabled={isValid}
            // Recordar que disabled acepta un valor booleano
            />
        </form>
    )
}
