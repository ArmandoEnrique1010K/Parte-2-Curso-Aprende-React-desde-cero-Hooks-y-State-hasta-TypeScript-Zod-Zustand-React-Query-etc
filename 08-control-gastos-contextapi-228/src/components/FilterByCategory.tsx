import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

// Componente para filtrar por categoria
export default function FilterByCategory() {

    // Llama al custom-hook para extraer dispatch
    const { dispatch } = useBudget();

    // Función para manejar el cambio (establece el type del parametro a ChangeEvent<HTMLSelectElement> )
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: 'add-filter-category',
            // El value seleccionado se pasa en el payload
            payload: { id: e.target.value }
        })
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-10 ">
            {/* Crea un formulario con un campo para seleccionar una categoria */}
            <form>
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar Gastos</label>
                    <select
                        id="category"
                        className="bg-slate-100 p-3 flex-1 rounded"
                        // Llama a la función en el evento onChange
                        onChange={handleChange}

                    // Abre React Developer Tools, selecciona una categoria y observa en el reducer (componente BudgetProvider) que el valor de currentCategory cambia
                    >
                        {/* Este option no tiene un value */}
                        <option value="">-- Todas las Categorias --</option>
                        {
                            // Itera sobre el arreglo de category para con el metodo map, muestra el siguiente contenido por cada elemento
                            categories.map(category => (
                                <option
                                    value={category.id}
                                    key={category.id}
                                >
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </form>
        </div>
    )
}
