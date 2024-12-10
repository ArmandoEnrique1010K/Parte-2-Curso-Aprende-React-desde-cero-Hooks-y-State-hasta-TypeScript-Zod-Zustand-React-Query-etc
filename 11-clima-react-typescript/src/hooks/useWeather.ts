import axios from 'axios'
import { SearchType, Weather } from '../types'

// Esta función se utilizara junto al type guard, para que el parametro "weather" no sea de tipo any, se asigna el type unknown (desconocido), se utiliza para representar un valor cuyo tipo no se conoce en el tiempo de compilación.

// Luego asigna el type Weather para el resultado devuelto por la función
function isWeatherResponse(weather: unknown): weather is Weather {
    // Coloca las validaciones
    return (
        // Concatena todas las validaciones con &&
        // Valida que weather exista
        Boolean(weather) &&
        // Recuerda que typeof sirve para obtener el tipo de dato
        typeof weather === 'object' &&
        // Valida que cada propiedad se cumpla (se castea Weather para tener el autocompletado)
        typeof (weather as Weather).name === 'string' &&
        typeof (weather as Weather).main.temp === 'number' &&
        typeof (weather as Weather).main.temp_max === 'number' &&
        typeof (weather as Weather).main.temp_min === 'number'
    )
}

export default function useWeather() {

    const fetchWeather = async (search: SearchType) => {
        try {
            const appId = import.meta.env.VITE_API_KEY

            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            // data es de tipo any
            const { data } = await axios(geoUrl)
            // console.log(data)

            // Obtiene la latitud y la longitud (propiedades lat y lon) del objeto que se tiene de la respuesta de la petición a la API. Se utiliza [0] porque se tiene un arreglo que contiene un solo objeto
            const lat = data[0].lat
            const lon = data[0].lon

            // Imprime los valores
            // console.log(lat)
            // console.log(lon)

            // Se necesita realizar una segunda petición a la API de Weather con la siguiente URL:

            // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

            // https://openweathermap.org/current

            // Crea una segunda variable de URL y pasale los parametros necesarios
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            // Accede a la URL generada y se tiene un objeto con la información del clima como la temperatura en grados kelvin
            // console.log(weatherUrl)

            // Para acceder a la información de forma directa con axios, desestructura data, pero como "data" ya se habia utilizado en la petición anterior, se reemplaza por otro nombre

            // TYPAR UNA PETICIÓN

            // weatherResult es de tipo any, se necesita typar (asignar un type). La peor opción es crear un type y asignarlo luego de axios.

            // const { data: weatherResult } = await axios<Weather>(weatherUrl)

            // Imprime un objeto que contiene toda la información del clima
            // console.log(weatherResult)

            // Las propiedades que se tienen en cuenta son: name (el nombre de la ciudad) y main (datos de la temperatura),

            // Imprime la temperatura y el nombre de la ciudad
            // console.log(weatherResult.main.temp)
            // console.log(weatherResult.name)

            // Si intentas eliminar una propiedad del type asignado a weatherResult como la propiedad name, imprimira undefined al imprimir el name, porque el type esta definido y lo forza a la respuesta de la petición a que se omita esa propiedad de la data.

            // TYPE GUARD

            // Otra opción para castear el type, porque al utilizar un type, se puede cometer errores como asignar algo que no va. Con 
            const { data: weatherResult } = await axios(weatherUrl)

            // Crea el type guard para la petición
            const result = isWeatherResponse(weatherResult)

            // Define la función isWeatherResponse antes de la función principal de useWeather

            // Imprime true si porque la data obtenida de la respuesta tiene la forma definida en isWeatherResponse 
            console.log(result)

            // El codigo toma la respuesta, pasa como objeto y aplica la validación de forma individual

            // Una vez que se cumpla el result, se tiene el autocompletado
            if (result) {
                console.log(weatherResult.main)
            } else {
                // Si eliminas una propiedad del objeto en el type Weather, imprimira lo siguiente, porque la respuesta de la API espera todas las propiedades definidas en el type Weather
                console.log("Respuesta mal formada")

                // La función isWeatherResponse comprueba la respuesta real o JSON que se obtiene.
            }

            // El problema de type guard es que el codigo sea muy grande y si se tiene multiples endpoints se tiene que crear multiples funciones, pero garantiza que la respuesta obtenida (desconocida para typescript) tenga la forma (en este caso isWeatherResponse)

        } catch (error) {
            console.log(error)
        }

        console.log('Consultando...')
    }

    return {
        fetchWeather
    }
}
