import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
      # Copia del codigo del archivo ".env.local" (recuerda que no se sube a github ese archivo porque se ha creado fuera de al carpeta src y contiene las variables de entorno)

      VITE_API_KEY = f428d227d2e294c72178a78ff9b3056d
    
    */}

    {/*
      Para hacer deployment de este proyecto que incluye una API KEY (el archivo .env.local es ignorado por git)

      Introduce el comando "npm run build" para generar la carpeta dist

      Sube la carpeta dist a Netlify

      Para agregar las variables de entorno, puedes hacer clic en el ultimo sitio web que has subido, selecciona en el panel izquierdo "Site configuration", selecciona "Environment variables", pulsa el botón "Add a variable"

      Puedes optar por subir el archivo ".env.local" o Agregar una variable con la opción "Add a variable"

      En el formulario, introduce el nombre del key "VITE_API_KEY" y en value "f428d227d2e294c72178a78ff9b3056d" para crear la variable de entorno. Pulsa "Create variable" y vuelve a acceder al sitio web

      En el caso de que quieras hacer unos cambios en el codigo fuente y deseas subirlo a Netlify, simplemente realiza el mismo procedimiento para generar la carpeta dist (los cambios se sobreescriben). Puedes ir a la sección "Deploys" del sitio web y sube la carpeta dist con los cambios en el panel de "Deploys". En este caso las variables de entorno que se encuentran en Netlify se mantienen.
    
    */}
    <App />
  </StrictMode>,
)
