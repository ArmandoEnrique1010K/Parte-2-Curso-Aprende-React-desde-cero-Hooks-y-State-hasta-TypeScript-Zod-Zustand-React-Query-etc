// Importa axios
import axios from 'axios'
import { SearchType } from '../types'

export default function useWeather() {

    // Weather API

    // En la ultima actualización se hacen 2 llamados por una consulta del clima, permiten 3000 llamados en el plan gratuito

    // Ve a la sección de API en: https://openweathermap.org/api, se tiene una opción para el clima actual "Current Weather Data". Abre su respectiva documentación en:

    // https://openweathermap.org/current

    // Una petición requiere de una latitud y longitud, siguiendo el formato:

    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    // La latitud y longitud se obtienen de una petición:

    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

    // Toma el nombre de la ciudad y el nombre del pais para retornar la latitud y longitud para hacer el otro llamado 

    // https://openweathermap.org/api/geocoding-api

    // AXIOS

    // Instala axios con el comando "npm i axios"

    // Es una abstracción de fetch API que simplifica los llamados cuando se consume datos

    // Función asincrona para consultar el clima porque va a llamar a una API y el codigo se bloqueara hasta obtener una respuesta, requiere un parametro search de tipo SearchType
    const fetchWeather = async (search: SearchType) => {
        // Se utiliza el bloque try - catch 
        try {
            // try ejecuta linea por linea este bloque, en el caso de que no se cumpla una de ellas saltea al error. Un error es que la URL no esta bien escrita

            // Ve a la sección Geocoding API de Weather API para copiar la URL para hacer una petición a la API
            // https://openweathermap.org/api/geocoding-api

            // Constante para almacenar la url
            // const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`

            // Requiere unos parametros: city name el nombre de la ciudad, state code y country code

            // Coloca el key generado para utilizar la API luego de haber iniciado sesión, se obtienen de: https://home.openweathermap.org/api_keys
            // const appId = 'f428d227d2e294c72178a78ff9b3056d'

            // El appId se tiene que ocultar porque cualquier persona puede copiar y usarlo en su proyecto

            // Si se va a utilizar una variable de entorno, utiliza lo siguiente (la variable se llama VITE_API_KEY y esta definida en el archivo ".env.local")
            const appId = import.meta.env.VITE_API_KEY

            // Asigna los datos del formulario a la URL: search.city y search.country, además del key de la API (ten en cuenta que se eliminaron unos parametros opcionales)
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            // Imprime la URL con los parametros recibidos desde el formulario
            // console.log(geoUrl)

            // Accede a la URL generada y se tendra un objeto de tipo JSON en el cual se podra ver el nombre de la ciudad, el pais, la latitud y la longitud

            // Para obtener la respuesta de la url, realiza lo siguiente

            // Realiza una petición de tipo GET con axios, existen 3 formas:
            // const data = await axios(geoUrl, { method: 'get' });
            // const data = await axios.get(geoUrl);
            // const data = await axios(geoUrl);

            // Imprime la respuesta devuelta por la petición, un objeto que contiene un status 200 y statusText "ok", quiere decir que se ha conectado correctamente. la propiedad data contiene el objeto devuelto por la petición (contiene la latitud y la longitud)
            // console.log(data)

            // Puedes desestructurar la propiedad data de la respuesta para obtener solamente los datos del pais de una forma directa
            const { data } = await axios(geoUrl)
            console.log(data)

        } catch (error) {
            // En el caso de que haya un error ejecuta lo siguiente
            console.log(error)
        }

        console.log('Consultando...')
    }

    // Exporta para que este disponible en los componentes
    return {
        fetchWeather
    }
}
