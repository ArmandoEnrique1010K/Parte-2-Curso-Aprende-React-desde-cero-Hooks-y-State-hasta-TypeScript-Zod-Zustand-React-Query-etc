import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Resumen de comandos */}
    {/*
      cd <<Ruta de la carpeta>>
      npm create vite@latest
      10-pacientes-zustand
      React
      TypeScript + SWC
      cd 10-pacientes-zustand
      npm install
    */}

    {/* Limpieza del proyecto */}
    {/*
      Elimina la carpeta assets, el archivo App.css, elimina todo el contenido de la carpeta public, limpia el archivo App.tsx y el archivo index.css
    */}

    {/* Comandos para instalar tailwind */}
    {/*
      npm i -D tailwindcss postcss autoprefixer
      npx tailwindcss init -p
    */}

    {/* Realiza unas modificaciones en el archivo tailwind.config.js */}

    <App />
  </StrictMode>,
)
