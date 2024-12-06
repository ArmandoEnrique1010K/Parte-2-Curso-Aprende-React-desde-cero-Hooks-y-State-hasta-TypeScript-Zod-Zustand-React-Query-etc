import { categories } from "../data/categories";
// Importaciones para React date picker
import DatePicker from 'react-date-picker';

// Las importaciones de las hojas de estilos para React date picker se encuentran en la documentación
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

// React Calendar es una depedencia que Date Picker requiere
// https://github.com/wojtekmaj/react-calendar

// types para React-date-pickerr (desde la documentación)
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


// Componente para el formulario para registrar gastos
export default function ExpenseForm() {
    return (
        // Recuerda que la clase space-y-5 aplica un espaciado a sus elementos hijos
        <form className="space-y-5">

            {/* El elemento legend sirve para mostrar un titulo en el formulario. La clase border-b-4 agrega un borde inferior al elemento */}
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                Nuevo Gasto
            </legend>

            {/* Contenedor para un campo del formulario */}
            <div className="flex flex-col gap-2">
                {/* Define el texto y campo para el nombre del gasto, recuerda que el valor definido en el atributo htmlFor de <label> debe coincidir con los atributos id y name de <input> */}
                <label
                    htmlFor="expenseName"
                    className="text-xl"
                >
                    Nombre Gasto:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                />
            </div>

            {/* Repite el mismo procedimiento */}
            <div className="flex flex-col gap-2">
                <label
                    // En VSCode, puedes pulsar la tecla ALT izquierda y luego marcar puntos en el codigo para escribir el mismo texto en todos esos puntos
                    htmlFor="amount"
                    className="text-xl"
                >
                    Cantidad:
                </label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                />
            </div>

            {/* En el caso de las categorias se necesita un arreglo de categorias, eso esta definido en la carpeta data, archivo categories.ts */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl"
                >
                    Categoría:
                </label>
                {/* Utiliza un elemento <select> en lugar de <input> */}
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                >
                    {/* Dentro se tendra un option vacio (No se coloca ningun valor) */}
                    <option value="">-- Seleccione --</option>

                    {/* Luego se itera sobre el arreglo categories */}
                    {categories.map(category => (
                        // Devuelve un elemento <option> por cada categoria
                        <option
                            key={category.id}
                            // El value contiene el id de la categoria
                            value={category.id}
                        >
                            {/* Muestra el nombre de la categoria */}
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Se requiere de una fecha, en este caso se instalara react-date-picker de NPM, soporta typescript */}

            {/* https://www.npmjs.com/package/react-date-picker */}

            {/* Ejecuta el comando: "npm i react-date-picker" para instalar la dependencia de react date picker y "npm i react-calendar" para React calendar (requerido para date picker) */}

            {/* Crea un nuevo campo para el formulario para la fecha */}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl"
                >
                    Fecha Gasto:
                </label>
                {/* Renderiza el componente DatePicker (propio de React date picker) */}
                <DatePicker
                    // Agregale unos estilos
                    className="bg-slate-100 p-2 border-0"
                // Se necesitan instalar las hojas de estilos de Date Picker
                />
            </div>

            {/* Recuerda que el campo para la fecha del calendario se encuentra en el formulario, pero aun no se puede ver la fecha introducida (ventana modal al hacer clic en el signo más) */}

            {/* Botón para subir el formulario */}
            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={'Registrar gasto'}
            />

        </form>
    )
}
