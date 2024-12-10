import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Comandos para crear el proyecto */}
    {/*
      cd <<Ruta de la carpeta>>
      npm create vite@latest
      11-clima-react-typescript
      React
      TypeScript + SWC
      cd 11-clima-react-typescript
      npm install
      npm run dev
    */}

    {/* Limpieza del proyecto */}
    {/* Elimina el archivo vite.svg de la carpeta public, la carpeta assets, el archivo App.css, el contenido de App.tsx e index.css */}

    {/* API para el clima */}

    {/* Se utilizara la API de open weather map y se necesita registrarse */}

    {/* https://openweathermap.org/ */}

    {/* Una vez que hayas iniciado sesion, ve a la pestaña API Keys, genera un nuevo key con un nuevo nombre: Ej: "React TypeScript API", pulsa en Generate y se tendra un nuevo key */}

    {/* Key de ejemplo: f428d227d2e294c72178a78ff9b3056d */}

    {/* Puede tardarse entre 10 a 15 minutos para registrarse en la base de datos de Open Weather Map */}

    {/* ¿QUE SON LAS APIS? */}

    {/* API = Application Programming Interface */}

    {/* Funciones, métodos que ofrece una librería para ser utilizada por otro software como una capa de abstracción */}

    {/* Una API pone a disposición recursos que están alojados en otro servidor o base de datos */}

    {/* Usualmente hay que enviar una petición asegurada */}

    {/* ¿QUE ES UNA API? */}

    {/* Utilizando React en el cliente con Vite, no puede consultar una base de datos, por lo tanto consultar una API es una forma de obtener datos dinámicos de un servidor o base de datos. */}

    {/* La API puede ser creada en cualquier lenguaje o framework: Python, Java, Net Core, Express, Node.js, Laravel, PHP */}

    {/* Para ello deberá entregar una respuesta tipo JSON */}

    {/* CONSULTAR UNA API CON REACT */}

    {/* Al ser JavaScript puedes utilizar Fetch API, axios o librerías como SWR para obtener datos y mostrarlos en pantalla */}

    {/* Algunas API's requieren un Key, y otras están protegidas por CORS */}

    <App />
  </StrictMode>,
)
