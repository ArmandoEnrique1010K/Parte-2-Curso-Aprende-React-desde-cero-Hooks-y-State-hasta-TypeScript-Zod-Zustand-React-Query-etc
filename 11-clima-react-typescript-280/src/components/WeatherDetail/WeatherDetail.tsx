// Crea este componente y su hoja de estilos como modulo, este componente mostrara los datos del clima obtenidos de la respuesta de la API

// Se importa el type Weather de la carpeta hooks
import { Weather } from "../../hooks/useWeather"
import { formatTemperature } from "../../utils"

// Importa la hoja de estilos
import styles from './WeatherDetail.module.css'

// Type para las props de este componente
type WeatherDetailProps = {
    weather: Weather
    // Segun el custom hook useWeather, el type se encuentra definido en ese archivo y no en types/index.ts
}

// Recibe weather con el type WeatherDetailProps y desaparece el error en App.tsx
export default function WeatherDetail({ weather }: WeatherDetailProps) {
    return (
        <div className={styles.container}>
            {/* Muestra el valor de la propiedad name */}
            <h2>Clima de: {weather.name}</h2>
            {/* Llama a la función para convertir la temperatura */}
            <p className={styles.current}>{formatTemperature(weather.main.temp)}&deg;C</p>
            {/* &deg; muestra el caracter "°" */}

            <div className={styles.temperatures}>
                <p>Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
                <p>Min: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
            </div>
        </div>
    )
}
