// No olvidar importar la hoja de estilos del Spinner
import "../Spinner.css"

// Componente para el spinner de carga 
export default function Spinner() {
    return (
        // Se utilizara un spinner de carga de Spinkit, selecciona uno y pulsa source para obtener el codigo HTML y CSS
        // https://tobiasahlin.com/spinkit/

        // Pega el codigo HTML aqui y reemplaza class por className. Los estilos se definen en el archivo Spinner.css (dentro de la carpeta raiz src)
        <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
        </div>)
}
