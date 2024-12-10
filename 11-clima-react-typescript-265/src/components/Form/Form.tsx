// Como cada componente requiere una hoja de estilos, se crea una carpeta por cada componente para que contenga la hoja de estilos

// Es valido crear una carpeta llamada modules o styles y agrupar las hojas de estilos

import { ChangeEvent, FormEvent, useState } from "react";
import type { SearchType } from "../../types";
import { countries } from "../../data/countries";

// Importa la hoja de estilos
import styles from './Form.module.css'
import Alert from "../Alert/Alert";

// Este componente representa un formulario
export default function Form() {

    // State para la busqueda
    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    // State para el mensaje de alerta
    const [alert, setAlert] = useState('');


    // Asigna el type en el parametro e para ambos elementos HTML: <input> y <select>
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        // Establece en el state de search el valor introducido
        setSearch({
            ...search,
            // name debe coincidir con el nombre de la propiedad en el state para que lo pueda escribir
            [e.target.name]: e.target.value
        })
    }

    // Función para subir el formulario
    const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
        // Previene el envio por defecto
        e.preventDefault()

        // Valida que si en el objeto search (convirtiendolo en un arreglo con values), incluye un string vacio
        if (Object.values(search).includes('')) {
            // console.log('Si hay campos vacios')
            // Establece el mensaje de alerta
            setAlert('Todos los campos son obligatorios')
            return
        }

        // Una vez que pasa la validación se puede enviar a la API
    }

    return (
        <form
            className={styles.form}
            // Añade el evento de onSubmit
            // Tipo de dato: React.FormEvent<HTMLFormElement>
            onSubmit={handleSumbit}
        >
            {/* Renderiza el componente Alert si hay un mensaje de alerta */}
            {
                // Pasale un children al componente Alert
                alert && <Alert>{alert}</Alert>
            }

            {/* Campo para la ciudad */}
            < div className={styles.field} >
                <label htmlFor="city">Ciudad: </label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    // Asigna el state en el value
                    value={search.city}
                    // Recuerda inferir en el type para la función que maneja el evento por cada cambio
                    // React.ChangeEvent<HTMLInputElement>
                    // onChange={e =>}
                    onChange={handleChange}

                />
            </div >

            {/* Campo para el pais */}
            <div className={styles.field} >
                <label htmlFor="country">País: </label>
                <select
                    id="country"
                    name="country"
                    // Asigna el state en el value
                    value={search.country}
                    onChange={handleChange}
                >
                    <option value="">--Seleccione un País--</option>
                    {
                        // Itera con el arreglo countries para obtener la lista de paises
                        countries.map(country => (
                            <option
                                key={country.code}
                                value={country.code}
                            >
                                {country.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            {/* Botón para enviar el formulario */}
            < input className={styles.submit} type="submit" value="Consultar Clima" />
        </form >
    )
}
