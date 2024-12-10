import styles from "./App.module.css";
import Form from "./components/Form/Form";
import useWeather from "./hooks/useWeather";

function App() {

  // Llama al custom hook
  const { fetchWeather } = useWeather()

  // VARIABLES DE ENTORNO EN VITE 

  {/* Como se puede ver, en el archivo useWeather hay una API key definida en "appId" que se tiene que ocultar, de lo contrario cualquier persona puede copiarlo y pegarlo en su proyecto */ }

  // https://vite.dev/guide/env-and-mode 

  // Las variables de entorno, son valores que en un entorno es uno y en otro entorno es otro. Por lo general cuando se tiene un entorno de producción, se cambian las variables de entorno que se utilizarón en el entorno de desarrollo 

  // Ejemplo: conexión a las bases de datos 

  // La ventaja es cuando se sube a GitHub, el codigo o las variables no tienen que ser visibles y en un hosting se tiene que agregar en un panel apartado 

  // Vite tiene variables de entorno 

  // Obtiene todas las variables de entorno definidas (Vite)
  // console.log(import.meta.env)

  // Con Node:
  // console.log(process)

  // Se tiene lo siguiente:
  // {
  //   "BASE_URL": "/",  <-- Base URL
  //     "DEV": true, <-- ¿Esta en modo desarrollo?
  //       "MODE": "development",  <-- Modo de desarrollo
  //         "PROD": false, <-- ¿Esta en modo producción?
  //           "SSR": false <-- Modo SSR
  // }

  // Se tiene que crear el archivo ".env.local" fuera de la carpeta raiz "src" para cargar las variables de entorno en modo desarrollo. Git omite ese archivo, no lo sube porque incluye información sensible

  // Los hosting incluyen un panel para agregar variables de entorno


  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form
          // Pasale la función como prop
          // VSCode infiere en el type de la prop fetchWeather a (search: SearchType) => Promise<void>, se debe realizar la correción en el componente Form
          fetchWeather={fetchWeather}
        />
        <p>2</p>
      </div>
    </>
  )
}

export default App
