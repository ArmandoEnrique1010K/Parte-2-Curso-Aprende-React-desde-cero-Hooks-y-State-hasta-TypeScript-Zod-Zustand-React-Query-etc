// Para aplicar estilos desde App.module.css primero se importa styles del archivo module.css
import styles from "./App.module.css";
import Form from "./components/Form/Form";

function App() {

  return (
    <>
      {/* Los modulos CSS, se utilizan en proyectos medianos, cuando se trabaja con modulos se crea un archivo con el mismo nombre del componente y que lleve el sufijo "module.css" */}

      {/* Para aplicar los estilos utiliza llaves y dentro coloca "styles" seguido del nombre de la clase */}
      <h1 className={styles.title}>Buscador de clima</h1>

      {/* Pulsa F12 en el navegador y observa que el nombre de la clase para este elemento se modifica añadiendo unos caracteres */}

      <div className={styles.container}>
        <Form />
        <p>2</p>
      </div>
    </>
  )
}

export default App
