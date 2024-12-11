import axios from 'axios'
// No se utiliza el type Weather
import { SearchType /*, Weather */ } from '../types'

// Importa Zod. 
// Se utiliza una "z" para representar la función principal cuando se trabaja con zod
// import { z } from 'zod'

// Importa Valibot
// Puedes importar el tipo de dato de forma modular (es mas ligero) y la función InferOutput (antes se llamaba Output) para la salida
import { object, string, number, InferOutput, parse } from 'valibot';



// FUNCIÓN PARA EL TYPE GUARD O ASSERTION
// function isWeatherResponse(weather: unknown): weather is Weather {
//     return (
//         Boolean(weather) &&
//         typeof weather === 'object' &&
//         typeof (weather as Weather).name === 'string' &&
//         typeof (weather as Weather).main.temp === 'number' &&
//         typeof (weather as Weather).main.temp_max === 'number' &&
//         typeof (weather as Weather).main.temp_min === 'number'
//     )
// }


// ESQUEMA DE ZOD

// El esquema de zod (se obtiene del type Weather), se tiene un objeto, la forma en que va a tener el type que se va a crear y revisar

// Copia del type definido en index.ts
// export type Weather = {
//     name: string
//     main: {
//         temp: number
//         temp_max: number
//         temp_min: number
//     }
// }

// Define una constante para utilizar la función de z. Zod trae metodos que se pueden utilizar, para la respuesta se utiliza el metodo object porque la data de la respuesta es un objeto
// const Weather = z.object({
//     // Agrega las propiedades de la siguiente forma (similar a un type)
//     name: z.string(),
//     main: z.object({
//         temp: z.number(),
//         temp_max: z.number(),
//         temp_min: z.number()
//     })
// })

// Crea el type utilizando el metodo infer para inferir en el tipo de dato
// type Weather = z.infer<typeof Weather>

// Con zod tambien puedes escribir un type Guard


// ESQUEMA DE VALIBOT

// Con valibot tambien se tiene que definir un esquema, la sintaxis es similar a zod pero sin "z"
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
})

// Define el type utilizando la función InferOutput de la siguiente manera para inferir en el tipo de dato
type Weather = InferOutput<typeof WeatherSchema>


export default function useWeather() {

    const fetchWeather = async (search: SearchType) => {
        try {
            const appId = import.meta.env.VITE_API_KEY

            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const { data } = await axios(geoUrl)

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            // ASIGNAR TYPE

            // const { data: weatherResult } = await axios<Weather>(weatherUrl)

            // console.log(weatherResult.main.temp)
            // console.log(weatherResult.name)


            // TYPE GUARD

            // const { data: weatherResult } = await axios(weatherUrl)
            // const result = isWeatherResponse(weatherResult)

            // if (result) {
            //     console.log(weatherResult.main)
            // } else {
            //     console.log("Respuesta mal formada")
            // }


            // LIBRERIA ZOD

            // Instalala con el comando "npm i zod" y luego importala en la parte superior de este archivo

            // Puedes definir un esquema e inferir el type que se generaria en base a ese esquema

            // Una vez definido el esquema, llama a la API con axios, como weatherResult es de tipo any
            // const { data: weatherResult } = await axios(weatherUrl);

            // Se utiliza el metodo safeParse para tomar el resultado de la consulta en la API y revisa las propiedades que se obtienen del JSON que corresponde al esquema definido en el objeto Weather
            // const result = Weather.safeParse(weatherResult)

            // Imprime un objeto que contiene las propiedades success (true o false) y la data (el objeto que contiene los datos de la respuesta)
            // console.log(result)

            // Utiliza lo siguiente para confirmar si se ha realizado la petición correctamente
            // if (result.success) {
            //     // Zod aplica el autocompletado
            //     console.log(result.data.name)
            //     console.log(result.data.main.temp)
            // } else {
            //     // En el caso de definir el esquema Weather de forma incorrecta, omitiendo ciertas propiedades, imprime lo siguiente (similar al Type Guard)
            //     console.log('Respuesta mal formada')
            // }

            // La ventaja con Zod es el autocompletado, la desventaja es que no es modular porque se importa una función, es un poco pesado


            // VALIBOT

            // Instalalo con el comando "npm i valibot" y luego realiza las importaciones en la parte superior de este archivo

            // Llama a la API
            const { data: weatherResult } = await axios(weatherUrl);

            // Para comprobar el JSON se utiliza una función llamada parse (no olvidar importarlo), pasale el esquema y el resultado de la consulta como argumentos
            const result = parse(WeatherSchema, weatherResult)

            // Imprime el resultado (solamente la data de la respuesta)
            // console.log(result)

            // Un dato es que los desarrolladores de Valibot se inspiraron en Zod
            if (result) {
                // Incluye autocompletado en VSCode
                console.log(result.name)
            } else {
                // Si diseñas mal el esquema como una propiedad que faltaba incluir, NO imprime este mensaje, sino que se saltea al catch
                console.log("respuesta mal formada")
            }

        } catch (error) {
            console.log(error)
        }

        // console.log('Consultando...')
    }

    return {
        fetchWeather
    }
}
