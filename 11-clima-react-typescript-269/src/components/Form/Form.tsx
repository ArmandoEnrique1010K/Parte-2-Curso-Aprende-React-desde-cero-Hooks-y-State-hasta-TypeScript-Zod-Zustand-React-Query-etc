import { ChangeEvent, FormEvent, useState } from "react";
import type { SearchType } from "../../types";
import { countries } from "../../data/countries";
import styles from './Form.module.css'
import Alert from "../Alert/Alert";

// No olvidar el type
type FormProps = {
    // fetchWeather: () => void
    // Corrige el type porque ahora es una función asincrona
    fetchWeather: (search: SearchType) => Promise<void>
}

// Recibe la prop fetchWeather
export default function Form({ fetchWeather }: FormProps) {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })

    const [alert, setAlert] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }

    const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }

        // Solamente cuando se pasa la validación, llama a la función fetchWeather, pasale como argumento el state de search
        fetchWeather(search)
    }

    return (
        <form
            className={styles.form}
            onSubmit={handleSumbit}
        >
            {
                alert && <Alert>{alert}</Alert>
            }
            <div className={styles.field} >
                <label htmlFor="city">Ciudad: </label>
                <input
                    id="city"
                    type="text"
                    name="city"
                    placeholder="Ciudad"
                    value={search.city}
                    onChange={handleChange}
                />
            </div >

            <div className={styles.field} >
                <label htmlFor="country">País: </label>
                <select
                    id="country"
                    name="country"
                    value={search.country}
                    onChange={handleChange}
                >
                    <option value="">--Seleccione un País--</option>
                    {
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

            <input className={styles.submit} type="submit" value="Consultar Clima" />
        </form >
    )
}
