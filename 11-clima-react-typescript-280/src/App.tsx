import styles from "./App.module.css";
import Alert from "./components/Alert/Alert";
import Form from "./components/Form/Form";
import Spinner from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";

function App() {

  // Extra weather, hasWeatherData, loading y notFound
  const { weather, fetchWeather, hasWeatherData, loading, notFound } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form
          fetchWeather={fetchWeather}
        />

        {
          // Solamente si loading es true, imprime un parrafo
          // loading && <p>Cargando...</p>

          // Los spiners que se encuentran en esta pagina contienen codigo HTML y CSS

          // https://tobiasahlin.com/spinkit/

          // Selecciona un spiner, copia el codigo HTML y CSS y pegalos en los componentes Spinner.tsx y Spinner.module.css

          // En lugar de mostrar un parrafo, se mostrara el componente <Spinner/>
          loading && <Spinner />

          // En React Developers Tools, ve al componente App, cambia el estado de loading a true de forma manual para visualizar el Spinner
        }
        {
          // Llama a la función hasWeatherData para verificar que tenga el name, y si lo tiene, renderiza el componente WeatherDetail y pasale weather como prop
          hasWeatherData && <WeatherDetail weather={weather} />
        }
        {
          // Si no hay nada, muestra un mensaje en el componente Alert, la ventaja de children es que le puedes pasarle cualquier texto, variable o componente. Children toma el texto que se encuentra entre las etiquetas de apertura y cierre del componente
          notFound && <Alert>Ciudad no encontrada</Alert>
        }
      </div>
    </>
  )
}

export default App
