import axios from 'axios'
import { SearchType /*, Weather */ } from '../types'

// En este proyecto se utilizara zod

// Importa Zod. 
import { z } from 'zod'
import { useMemo, useState } from 'react'

// Importa Valibot
// import { object, string, number, InferOutput, parse } from 'valibot';


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

const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })
})

// El type se tiene que exportar, no se utiliza el que se encuentra en la carpeta types porque el type esta sincronizado con lo que zod ofrece
export type Weather = z.infer<typeof Weather>


// ESQUEMA DE VALIBOT

// const WeatherSchema = object({
//     name: string(),
//     main: object({
//         temp: number(),
//         temp_max: number(),
//         temp_min: number()
//     })
// })

// type Weather = InferOutput<typeof WeatherSchema>

// Valores iniciales del state
const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

export default function useWeather() {

    // state para los datos del clima, se asigna el type Weather (definido en este archivo) y su valor inicial
    const [weather, setWeather] = useState<Weather>(initialState)

    // state para un estado de carga (ten en cuenta que al hacer una consulta a la API, puede demorarse)
    const [loading, setLoading] = useState(false)

    // state para un estado de que no ha sido encontrado
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {
        try {
            const appId = import.meta.env.VITE_API_KEY

            // Cambia el estado de loading a true antes de realizar la petición a la URL
            setLoading(true);

            // Establece el state de weather a sus valores iniciales para evitar mantener los datos del clima de la busqueda anterior 
            setWeather(initialState)

            // Corrección, es https y no http, porque en un entorno de producción como Netlify no lo reconoce 
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const { data } = await axios(geoUrl)

            // Imprime data, si no existe las coordenadas muestra un arreglo vacio
            console.log(data)
            // Si no existen las coordenadas, muestra undefined
            console.log(data[0])

            // Comprueba de que no existan las coordenadas
            if (!data[0]) {
                // console.log('Clima no encontrado')

                // Establece el estado de notFound a true
                setNotFound(true)

                // Evita que se ejecute las siguientes lineas de codigo
                return
            }

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

            // Comando: "npm i zod"

            const { data: weatherResult } = await axios(weatherUrl);
            const result = Weather.safeParse(weatherResult)

            // console.log(result)

            if (result.success) {
                // console.log(result.data.name)
                // console.log(result.data.main.temp)

                // Asigna la data obtenida de la respuesta en el state de weather
                setWeather(result.data)

                // Lo puedes revisar en React Developers Tools en el componente App la data obtenida luego de realizar una busqueda en el formulario

                // Recuerda que la información viene una vez que se valida

                // Establece el estado loading a false porque en ese momento ya cargo los datos de la respuesta
                // setLoading(false)

                // Si se coloca eso, solamente se ejecuta si el llamado el correcto

            } else {

                console.log('Respuesta mal formada')
            }


            // VALIBOT

            // Comando: "npm i valibot"

            // const { data: weatherResult } = await axios(weatherUrl);

            // const result = parse(WeatherSchema, weatherResult)

            // console.log(result)

            // if (result) {
            //     console.log(result.name)
            // } else {
            //     // // console.log("respuesta mal formada")
            // }


        } catch (error) {
            // Puede mostrar un mensaje de error si no encuentra las coordenadas, por ejemplo al enviar la ciudad "Miami" y el pais "Costa Rica" desde el formulario, al imprimir data muestra un arreglo vacio
            console.log(error)
        }
        // Con el uso de try y catch se tiene el termino finally, independientemente de que se ejecute el código del try o que se ejecute el código del catch, este codigo siempre se ejecuta
        finally {
            // Es un buen lugar para establecer el estado de loading a false
            setLoading(false)
        }
    }


    // Crea una función para verificar que weather tenga algo, puedes optar por la propiedad name de weather
    const hasWeatherData = useMemo(() => weather.name, [weather])

    // Como esta función verifica que haya algo en el estado de weather, si se reinicia a los valores iniciales, devolvera false porque la propiedad name es un string vacio

    return {
        // Pasa el state de weather (datos del clima), hasWeatherData, loading y notFound
        weather,
        fetchWeather,
        hasWeatherData,
        loading,
        notFound
    }
}
