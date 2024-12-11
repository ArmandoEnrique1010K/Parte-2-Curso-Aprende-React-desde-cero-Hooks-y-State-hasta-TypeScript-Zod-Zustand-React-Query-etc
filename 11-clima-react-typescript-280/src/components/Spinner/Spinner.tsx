// Importa la hoja de estilos
import "./Spinner.css"
// import styles from './Spinner.module.css'

// Este componente contiene el codigo del Spinner
export default function Spinner() {
    return (
        // Recuerda reemplazar class por className si vas a copiar y pegar codigo HTML
        <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>

        // Pero si vas a utilizar un modulo CSS, recuerda añadir el prefijo "styles." en cada className
        // <div className={styles.spinner}>
        //     <div className={styles.bounce1}></div>
        //     <div className={styles.bounce2}></div>
        //     <div className={styles.bounce3}></div>
        // </div>

        // En versiones anteriores de React, se tendria que optar por una hoja de estilos en lugar de un modulo CSS para mostrar los estilos que se van a aplicar a un Spinner
    )
}
