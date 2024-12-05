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
      08-control-gastos-contextapi
      React
      TypeScript + SQC
      cd 08-control-gastos-contextapi
      npm install
    */}

    {/* Limpieza del proyecto */}
    {/*
      1. Arrastra la carpeta del proyecto hacia VSCode
      2. Ejecuta el proyecto en una nueva terminal de VSCode, escribiendo "npm run dev"
      3. Elimina la carpeta assets, el archivo App.css y limpia el contenido de App.tsx y de index.css (este ultimo no se elimina porque ahi se incluira TailwindCSS)
      4. Como este proyecto va a tener unos iconos en la interfaz web, se puede colocar las imagenes en la carpeta public
      
      Next JS y otros frameworks ya incluyen tailwindCSS por defecto
    */}

    {/* Instalar tailwindCSS */}
    {/*
      1. Abre una nueva terminal y ejecuta el comando "npm i -D tailwindcss postcss autoprefixer" (son dependencias de desarrollo)
      2. Ejecuta el comando "npx tailwindcss init -p" para crear los archivos de configuración de tailwindCSS
      3. Abre el archivo tailwind.config.js, realiza una modificación en ese archivo
      4. Abre el archivo index.css para colocar las directivas de tailwind
      5. Vuelve a ejecutar el proyecto con el comando "npm run dev"
    */}
    <App />
  </StrictMode>,
)
